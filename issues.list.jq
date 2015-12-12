[.issues[] |
select(.fields.resolutiondate != null) |
{
   summary:.fields.summary,
   created:.fields.created,
   resolved:.fields.resolutiondate,
   id:.id,
   key:.key,
   epic:.fields.customfield_10008,
   status:.fields.status.name,
   issuetype:.fields.issuetype.name,
   parent:{
      id:.fields.parent.id,
      key:.fields.parent.key,
      summary:.fields.parent.fields.summary
   },
   reporter:.fields.reporter.displayName,
   assignee:.fields.assignee.displayName
}]