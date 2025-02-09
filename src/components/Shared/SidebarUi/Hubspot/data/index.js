export const loadOptions = async (dropdownType) => {
  let options;
  switch (dropdownType) {
    case 'company':
      ({ company: options } = await import('./companyOptions'));
      break;
    case 'contact':
      ({ contact: options } = await import('./contactOptions'));
      break;
    case 'deal':
      ({ deal: options } = await import('./dealOptions'));
      break;
    case 'ticket':
      ({ ticket: options } = await import('./ticketOptions'));
      break;
    default:
      return null;
  }
  const properties = options?.properties;
  const optionsList = properties
    .map(({ options, name, ...rest }) => ({ value: name, ...rest }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return optionsList || [];
};

export const hubspotEvents = [
  {
    label: 'New Contact',
    value: 'newContact',
    group: 'Create',
    key: 'contact',
    action: 'HUBSPOT_NEW_CONTACT',
  },
  {
    label: 'New Company',
    value: 'newCompany',
    group: 'Create',
    key: 'company',
    action: 'HUBSPOT_NEW_COMPANY',
  },
  {
    label: 'New Deal',
    value: 'newDeal',
    group: 'Create',
    key: 'deal',
    action: 'HUBSPOT_NEW_DEAL',
  },
  {
    label: 'New Ticket',
    value: 'newTicket',
    group: 'Create',
    key: 'ticket',
    action: 'HUBSPOT_NEW_TICKET',
  },
  {
    label: 'Update a Contact',
    value: 'updateContact',
    group: 'Update',
    key: 'contact',
    action: 'HUBSPOT_UPDATE_CONTACT',
  },
  {
    label: 'Update a Company',
    value: 'updateCompany',
    group: 'Update',
    key: 'company',
    action: 'HUBSPOT_UPDATE_COMPANY',
  },
  {
    label: 'Update a Deal',
    value: 'updateDeal',
    group: 'Update',
    key: 'deal',
    action: 'HUBSPOT_UPDATE_DEAL',
  },
  {
    label: 'Update a Ticket',
    value: 'updateTicket',
    group: 'Update',
    key: 'ticket',
    action: 'HUBSPOT_UPDATE_TICKET',
  },
  {
    label: 'Get a Record',
    value: 'getRecord',
    group: 'Get',
    key: '',
    action: 'HUBSPOT_GET_RECORD',
  },
];

export const hubspotEventActions = {
  HUBSPOT_NEW_CONTACT: 'HUBSPOT_NEW_CONTACT',
  HUBSPOT_NEW_COMPANY: 'HUBSPOT_NEW_COMPANY',
  HUBSPOT_NEW_DEAL: 'HUBSPOT_NEW_DEAL',
  HUBSPOT_NEW_TICKET: 'HUBSPOT_NEW_TICKET',
  HUBSPOT_UPDATE_CONTACT: 'HUBSPOT_UPDATE_CONTACT',
  HUBSPOT_UPDATE_COMPANY: 'HUBSPOT_UPDATE_COMPANY',
  HUBSPOT_UPDATE_DEAL: 'HUBSPOT_UPDATE_DEAL',
  HUBSPOT_UPDATE_TICKET: 'HUBSPOT_UPDATE_TICKET',
  HUBSPOT_GET_RECORD: 'HUBSPOT_GET_RECORD',
};
