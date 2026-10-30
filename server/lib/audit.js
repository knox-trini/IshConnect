export function auditEvent(action, eventId, changedFields = [], actor = "admin") {
  console.info(
    JSON.stringify({
      type: "cms.audit",
      resource: "event",
      action,
      eventId,
      actor,
      timestamp: new Date().toISOString(),
      changedFields,
    }),
  );
}
