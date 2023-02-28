/**
 * Increment a semantic version by given field
 */
export const increment = (version: string, field: string): string => {
  const matcher =
    /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(-(?<label>[0-9A-Za-z-]+))?$/;

  const matches = version.match(matcher);
  if (!matches || !matches.groups) {
    throw new Error("version must match semantic-versioning format");
  }

  const { major, minor, patch, label } = matches.groups;
  if (!major || !minor || !patch) {
    const labelled = [
      `major: "${major}"`,
      `minor: "${minor}"`,
      `patch: "${patch}"`,
      `label: "${label}"`,
    ].join(", ");
    throw new Error(`could not extract all fields out of version, ${labelled}`);
  }

  const validFields = ["major", "minor", "patch"];
  const fieldIndex = validFields.indexOf(field);
  if (fieldIndex < 0) {
    const allFields = validFields.join(", ");
    throw new Error(`invalid field "${field}", must be one of [${allFields}]`);
  }

  const fields = [major, minor, patch];
  const selectedField = parseInt(fields[fieldIndex]);
  if (isNaN(selectedField)) {
    throw new Error(
      `failed to parse field "${fields[fieldIndex]}" into number`
    );
  }

  fields[fieldIndex] = `${selectedField + 1}`;
  const serialised = fields.join(".");
  return `${serialised}${label ? `-${label}` : ""}`;
};
