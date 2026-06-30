#!/usr/bin/env node
/**
 * Version sync-check for ccsk-kit (maintainer/CI tool — NOT shipped to users; lives
 * under .github/ which copy-kit excludes).
 *
 * `claude plugin validate` does NOT enforce semver or cross-file agreement, so this
 * is the only guard against version drift / a malformed version string.
 *
 * Asserts:
 *   1. VERSION is a valid semver (incl. zero-padded prerelease like 2.0.0-beta-01)
 *   2. marketplace.metadata.version === marketplace.plugins[0].version
 *      === plugin.json.version === VERSION
 *   3. (with --tag=<ref>) the release ref equals `v<VERSION>`
 *
 * Usage:
 *   node .github/scripts/check-version.mjs            # field agreement + format
 *   node .github/scripts/check-version.mjs --tag=v2.0.0-beta-01   # also assert tag
 *
 * Exits 1 on any mismatch.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const rd = (p) => readFileSync(path.join(root, p), 'utf8');
const rj = (p) => JSON.parse(rd(p));

// Accepts X.Y.Z with an optional dot/dash-delimited prerelease (e.g. -beta-01, -rc.1)
// and optional build metadata. Mirrors semver but tolerant of the kit's `-beta-01` style.
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z][0-9A-Za-z.-]*)?(?:\+[0-9A-Za-z.-]+)?$/;

const errors = [];
const version = rd('VERSION').trim();

if (!SEMVER.test(version)) {
  errors.push(`VERSION "${version}" is not a valid semver string`);
}

const market = rj('.claude-plugin/marketplace.json');
const plugin = rj('plugins/ccsk/.claude-plugin/plugin.json');

const fields = {
  'VERSION': version,
  'marketplace.metadata.version': market?.metadata?.version,
  'marketplace.plugins[0].version': market?.plugins?.[0]?.version,
  'plugins/ccsk/.claude-plugin/plugin.json#version': plugin?.version,
};

for (const [name, val] of Object.entries(fields)) {
  if (val !== version) {
    errors.push(`${name} = ${JSON.stringify(val)} — expected "${version}"`);
  }
}

const tagArg = process.argv.find((a) => a.startsWith('--tag='));
if (tagArg) {
  const ref = tagArg.slice('--tag='.length).replace(/^refs\/tags\//, '');
  if (ref !== `v${version}`) {
    errors.push(`git ref "${ref}" — expected "v${version}"`);
  }
}

if (errors.length) {
  console.error('✗ version sync-check FAILED:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ version sync-check passed — all fields = ${version}`);
