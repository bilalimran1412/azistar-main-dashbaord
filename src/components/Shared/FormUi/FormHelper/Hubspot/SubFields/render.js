import { GetRecords } from './GetRecords';
import { NewCompanyFields } from './NewCompanyFields';
import { NewContactFields } from './NewContactFields';
import { NewDealFields } from './NewDealFields';
import { NewTicketFields } from './NewTicketFields';
import { UpdateField } from './UpdateField';

export const renderer = (contentType) => {
  switch (contentType) {
    case 'newContact':
      return NewContactFields;
    case 'newCompany':
      return NewCompanyFields;
    case 'newDeal':
      return NewDealFields;
    case 'newTicket':
      return NewTicketFields;
    case 'updateContact':
    case 'updateCompany':
    case 'updateDeal':
    case 'updateTicket':
      return UpdateField;
    case 'getRecord':
      return GetRecords;
    default:
      return () => <></>;
  }
};
// const hubspotEvents = [
//   {
//     label: 'New Contact',
//     value: 'newContact',
//     group: 'Create',
//     key: 'contact',
//     action: 'HUBSPOT_NEW_CONTACT',
//   },
//   {
//     label: 'New Company',
//     value: 'newCompany',
//     group: 'Create',
//     key: 'company',
//     action: 'HUBSPOT_NEW_COMPANY',
//   },
//   {
//     label: 'New Deal',
//     value: 'newDeal',
//     group: 'Create',
//     key: 'deal',
//     action: 'HUBSPOT_NEW_DEAL',
//   },
//   {
//     label: 'New Ticket',
//     value: 'newTicket',
//     group: 'Create',
//     key: 'ticket',
//     action: 'HUBSPOT_NEW_TICKET',
//   },
//   {
//     label: 'Update a Contact',
//     value: 'updateContact',
//     group: 'Update',
//     key: 'contact',
//   },
//   {
//     label: 'Update a Company',
//     value: 'updateCompany',
//     group: 'Update',
//     key: 'company',
//   },
//   { label: 'Update a Deal', value: 'updateDeal', group: 'Update', key: 'deal' },
//   {
//     label: 'Update a Ticket',
//     value: 'updateTicket',
//     group: 'Update',
//     key: 'ticket',
//   },
//   { label: 'Get a Record', value: 'getRecord', group: 'Get' },
// ];
