export default function projectAlreadyBoostedChecker(projectId, projects) {
  if (projects) {
    return projects.includes(projectId);
  }
  return false;
}
