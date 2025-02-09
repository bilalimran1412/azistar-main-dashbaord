import SidebarFormContainer from '../Shared/SidebarUi/SidebarFormContainer';

function DefaultNodeContent() {
  return (
    <SidebarFormContainer block={{ id: 'some' }} initialValues={{ test: '' }}>
      In progress
    </SidebarFormContainer>
  );
}

export default DefaultNodeContent;
