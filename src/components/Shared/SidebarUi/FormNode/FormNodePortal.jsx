import React from 'react';
import { FixedSidebarPortal } from 'components/Shared/UiComponents';
import { NodeSettingsPortalContent } from '.';
import { sideViewLayoutType } from '../../../../config/nodeConfigurations';import {
  AskDateFields,
  AskEmailFields,
  AskNumberFields,
  AskPhoneFields,
  AskQuestionFields,
} from './QuestionTypeFormFields';

function FormNodePortal({
  type,
  isCard = true,
  subFieldName,
  setActiveSidebar,
  activeSidebar,
  contentKey,
}) {
  const componentMap = {
    settings: NodeSettingsPortalContent,
    [sideViewLayoutType.askQuestion]: AskQuestionFields,
    [sideViewLayoutType.askEmail]: AskEmailFields,
    [sideViewLayoutType.askNumber]: AskNumberFields,
    [sideViewLayoutType.askPhone]: AskPhoneFields,
    [sideViewLayoutType.date]: AskDateFields,
  };
  const Content = componentMap[type];

  return (
    <FixedSidebarPortal
      isCard={isCard}
      setActiveSidebar={setActiveSidebar}
      activeSidebar={activeSidebar}
      contentKey={contentKey}
    >
      {Content ? <Content subFieldName={subFieldName} /> : <></>}
    </FixedSidebarPortal>
  );
}

export { FormNodePortal };
