# 2D Visualization API Integration

---

## Context

We are having a feature/module called 2D Visualization. The UI for this feature is done.
The feature is currently using mock data and zustand store for simulation behaviors.

Now we need to integrate the real APIs for that and remove all mock data and mock store related to this feature.

- Load context and implementation plan (with mock data) previously at: `.claude/plans/feat-2d-visualization-plan.md` to understand correctly what we have before planning for next step.

## Goals

User can use 2D Visualization feature with fully API support.

## User Story / User Flow / Customer Journey

1. User access to the 2D Visualization page `/visualization` and see list of visualizations with fully filter by `building_id`, `pagination`.
2. User can click `New Visualization` to access the Create New Visualization page `/visualization/new`
3. User can click on each data table row or view button icon at visualization listing page `/visualization` to access the Visualization Details page.
4. User can click to edit button icon at visualization listing page or click to `Edit Visualization` button at Visualization Details page to access edit page at `/visualization/[id]/edit`

## Detailed Requirements

### I. Visualization Listing Page

**Page URL**: `/visualization`
**API Endpoints**:

1. **Get list of buildings**: The buildings selector will be used for filtering visualization listing

- **Endpoint**: `/buildings`
- **Query Params**: `page` -> current page, `limit` -> page size, `search` -> search keyword/term
- **API Response**: `ApiResponsePaginated<Building>`

2. **Get list of visualization**: The data table of this page is visualization with fully search by keyword, pagination and filter by building_id

- **Endpoint**: `/visualization`
- **Query Params**: `q` -> search keyword/term, `limit` -> page size, `page` -> current page, `building_id` -> filter visualization by building_id selected from the selector dropdown.
- **API Response**: `ApiResponsePaginated<Visualization>`

```ts
interface Visualization {
  id: string
  building_name: string
  floor_name: string
  zone: Zone
  total_devices: number

  created_at: string
  updated_at: string
}
```

**Data Table**: The data table displays columns by following:

- `No.` -> Ordinal number
- `Zone` -> Zone name
- `Area` -> Show building and floor in the pattern `[building name] -> [floor name]`
- `Total devices` -> Total devices
- `Creation date` -> created_date
- `Last modified` -> updated_at
- `Action` -> Three actions as icon button: `View` | `Edit` | `Delete`

### II. New Visualization Page

**Page URL**: `/visualization/new`
**API Endpoints**:

1. **Get list of buildings**: Get list of buildings for selector dropdown will be same as `I. Visualization Listing Page`
2. **Get list of floors**: Get list of floors for selector dropdown

- **Endpoint**: `/floors`
- **Query Params**: `building_id` -> selected building_id from `building` selector dropdown, `page` -> current page, `page_size` -> page size
- **API Response**: `ApiResponsePaginated<Floor>`

3. **Get list of zones**: Get list of zones for selector dropdown

- **Endpoint**: `/zones`
- **Query Params**: `floor_id` -> selected floor_id from `floor` selector dropdown, `page` -> current page, `page_size` -> page size
- **API Response**: `ApiResponsePaginated<Floor>`

4. **Get list of device types**: Get list of device types to add device

- **Endpoint**: `/devices/types`
- **Query Params**: `page` -> current page, `limit` -> page size
- **API Response**: `ApiResponsePaginated<DeviceType>`

```ts
interface DeviceType {
  id: string
  code: string
  name: string
}
```

5. **Get list of unknown devices**: Get list of unknown devices by device type to add device to the visualization

- **Endpoint**: `/unknown-devices`
- **Query Params**: `page` -> current page, `limit` -> page size, `status` -> unknown device status (unclaimed | claimed | ignored)
- **API Response**: `ApiResponsePaginated<UnknownDevice>`

```ts
interface UnknownDevice {
  id: string
  serial_number: string
  status: string
  created_at: string
  updated_at: string
}
```

6. **Get detailed unknown device information**:

- **Endpoint**: `/unknown-devices/:id`
- **API Response**: `ApiResponsePaginated<UnknownDevice>`

```ts
interface UnknownDevice {
  id: string
  serial_number: string
  status: string
  created_at: string
  updated_at: string
}
```

7. **Post to create new Visualization**

- **Endpoint**: `/visualization`
- **Method**: `POST`
- **Request Body/Payload**:

```ts
interface CreateVisualizationRequest {
  zone_id: string
  image_url?: string
  devices: Array<{
    id: string
    coordinate: {
      x: string
      y: string
    }
  }>
}
```

8. **Put to edit Visualization**

- **Endpoint**: `/visualization/:id`
- **Method**: `PUT`
- **Request Body/Payload**:

```ts
interface UpdateVisualizationRequest {
  id: string
  zone_id: string
  image_url?: string
  devices: Array<{
    id: string
    coordinate: {
      x: string
      y: string
    }
  }>
}
```

9. **Get Visualization Details**: Get detailed visualization details for updating/editing

- **Endpoint**: `/visualization/:id`
- **Method**: `GET`
- **API Response**: `ApiResponseSingle<Visualization>`

**Goal**: User can select zone to create 2d visualization (because 2d visualization will be built base on Zone)
**Behaviors**:

- **Select Target Zone for Creating Visualization**:

  - Load buildings selector dropdown list -> Default building selected is first item
  - Load floors selector dropdown list base on building selected change -> Load floors listing by building_id -> Default floor selected is first item
  - Load zones selector dropdown list base on floor selected change -> Load zones listing by floor_id -> Default zone selected is first item

- **Load zone image as a visualization frame stage**:

  - Each zone has `image_url` to show on a canvas as background image -> Load this image to background image
  - If `image_url` into zone is empty or null or undefined -> The `Import Image` button in visualization toolbar will be appeared
  - User can click to `Import Image` and select an image to upload as a background image (just for the case that zone is not have image_url)

- **Add device into draw stage with zone image as background image**:

  - Show placeholder text in center and middle of the draw stage if there is no devices added. For example: `Click anywhere to start adding device`
  - User click anywhere inside the draw stage -> An add device popover will be displayed and showed list of device types (with searchable input at top) for user select the device type they want to add.
  - User select a device type -> A popover select unknown device will be displayed and showed list of unknown devices (with searchable input at top) for user select to add device they want.
  - User click to added device to see detailed information of that device.
  - Add a button to allow user remove device from the draw stage visualization

- **Saving Visualization**

  - Case 1: Visualization with zone has `image_url`

    When visualization with zone has `image_url` after doing anything and click `Save` button -> Call POST visualization API to create.
    After creating successfully -> Show a confirmation navigation popup with these options: `See details` | `Back to list`.
    The countdown timer for 5s to automatically navigate back to visualization listing page.

  - Case 2: Visualization with zone don't have `image_url` and user Import Image.

    When visualization with zone don't have `image_url` and user had to Import Image. After doing anything and click `Save`.
    Before calling POST visualization API to create, we have to upload Imported Image first by using `MediaService.uploadBase64` and get the `file_url` to submit it as `image_url` property for submitting create visualization API.

### III. Edit Visualization Page

**Page URL**: `/visualization/:id/edit`

Same behaviors of Create New Visualization Page but there are some differences:

1. When access to the Edit Visualization page -> Load detailed visualization information and patch values
2. We don't need selector dropdowns: Buildings, Floors, Zones at all
