# Feature: Template Settings - Template Management

> In case you don't have Figma access or even don't have UI design

--

## Context

The front office system has a lot of features that use quill editor for chatting or messaging. So now, as an user (staff or manager) I would like to build a feature that called Template Management.

The template management allow us to pre-define or pre-design quill editor templates and then easy to use the selected template when chatting, messaging or something like that.

## Requirements

### Sidebar menu & Routing

- Sidebar menu will be as a child of Settings

```text
Settings
    |__ Overview  -> Existing
    |__ Users     -> Existing
    |__ Automation  -> Existing
    |__ Templates -> New (need to do)
```

- Routing: `/settings/templates`

### Template Types

In quill editor template we will have two types of template:

**Message Template**: Template for chatting, use it for selecting to append template to the chat editor.
**Survey Template**: Template that use when creating surveys, campaign, ...

### UI & Layout

**Layout**: The template management layout will be like below

---------------------------------------------------------------------------------------------|
[Create new message template button] [Create new survey template button] |

  <PageContainer>
      <PageInnerContent>
          Message template

          Message Template listing
              Message Template Item:
                  Template name: <template name>                  Edit | Duplicate | Delete action
                  Message: <message> (line-clamp-2)

          Survey Template listing (same as message template)
              Survey Template Item:
                  Template name: <template name>                  Edit | Duplicate | Delete action
                  Message: <message> (line-clamp-2)

          <Pagination> -> The pagination apply for both message templates and survey templates because we are using just one api for fetching template listing
      </PageInnerContent>

  </PageContainer>

The message template listing and survey template listing will be scrollable the list of items. Max height of them should be 36dvh for scrolling.

**UI**

- **Create/Edit Template**: Create or update/edit template will be showed as a centered modal/popup with form fields like below:

```jsx
Template name
[Input string]

Message
[Quill Editor]

[Cancel button]     [Save button]
```

The quill editor message should show current length and max length, for example: 0/640 below the quill editor at left. Maximum length allowed is 640.

As for the quill editor please take a look on `@shared/components/chat/chat-editor.tsx` for following the styles, layout patterns but removing attachment from editor for the template.

After saving/saving changes successfully, the new record will be saved at top of the list based on their type (message or survey) -> Use optimistic UI update for these cases: create, update, remove, duplicate.
