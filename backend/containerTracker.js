const containerCounts = new Map(); // instanceId => count
const instanceDetails = new Map(); // instanceId => publicIp

export function registerInstance(instanceId, publicIp) {
  containerCounts.set(instanceId, 0);
  instanceDetails.set(instanceId, publicIp);
}

export function getAvailableInstance() {
  for (const [instanceId, count] of containerCounts.entries()) {
    if (count < 2) {
      return { instanceId, publicIp: instanceDetails.get(instanceId) };
    }
  }
  return null;
}

export function incrementContainer(instanceId) {
  containerCounts.set(instanceId, (containerCounts.get(instanceId) || 0) + 1);
}

export function decrementContainer(instanceId) {
  const current = containerCounts.get(instanceId);
  if (current >= 1) {
    containerCounts.set(instanceId, current - 1);
    return false;
  } else {
    containerCounts.delete(instanceId);
    instanceDetails.delete(instanceId);
    return true; // signal to terminate
  }
}
