import jsonLDFlattner from "../utils/jsonLDFlattener";

export default function projectAlreadyBoostedChecker(projectId, projects) {
  if (projects) {
    return jsonLDFlattner(projects).includes(projectId);
  }
  return false;
}
