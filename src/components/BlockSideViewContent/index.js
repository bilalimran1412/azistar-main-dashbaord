import { sideViewLayoutType } from '../../config/nodeConfigurations';
import ABTestingNodeContent from './ABTestingNodeContent';
import AskAddressNodeContent from './AskAddressNodeContent';
import AskEmailNodeContent from './AskEmailNodeContent';
import AskFileNodeContent from './AskFileNodeContent';
import AskNameNodeContent from './AskNameNodeContent';
import AskNumberNodeContent from './AskNumberNodeContent';
import AskPhoneNodeContent from './AskPhoneNodeContent';
import AskQuestionNodeContent from './AskQuestionNodeContent';
import AskUrlNodeContent from './AskUrlNodeContent';
import ButtonNodeContent from './ButtonNodeContent';
import DateNodeContent from './DateNodeContent';
import FormNodeContent from './FormNodeContent';
import GoodByeNodeContent from './GoodByeNodeContent';
import MessageMediaNodeContent from './MessageMediaNodeContent';
import MultiQuestionsNodeContent from './MultiQuestionsNodeContent';
import OpinionScaleNodeContent from './OpinionScaleNodeContent';
import PictureChoiceNodeContent from './PictureChoiceNodeContent';
import RatingNodeContent from './RatingNodeContent';
import YesNoNodeContent from './YesNoNodeContent';
import BotJumpNodeContent from './BotJumpNodeContent';
import GoalNodeContent from './GoalNodeContent';
import PersistentMenuNodeContent from './PersistentMenuNodeContent';
import LeadScoringNodeContent from './LeadScoringNodeContent';
import EmailIntegrationContent from './EmailIntegrationContent';
import AIFAQNodeContent from './AIFAQNodeContent';
import BusinessHoursNodeContent from './BusinessHoursNodeContent';
import HumanTakeoverNodeContent from './HumanTakeoverNodeContent';
import TriggerAutomationNodeContent from './TriggerAutomationNodeContent';
import SlackNodeContent from './SlackNodeContent';
import GoogleSheetsNodeContent from './GoogleSheetsNodeContent';
import ZapierNodeContent from './ZapierNodeContent';
import CalendlyNodeContent from './CalendlyNodeContent';
import GoogleAnalyticsNodeContent from './GoogleAnalyticsNodeContent';
import NoteNodeContent from './NoteNodeContent';
import WebhookNodeContent from './WebhookNodeContent';
import MailchimpNodeContent from './MailchimpNodeContent';
import HubspotNodeContent from './HubspotNodeContent';

export const SideViewContent = {
  [sideViewLayoutType.goodBye]: GoodByeNodeContent,
  [sideViewLayoutType.askQuestion]: AskQuestionNodeContent,
  [sideViewLayoutType.askName]: AskNameNodeContent,
  [sideViewLayoutType.askNumber]: AskNumberNodeContent,
  [sideViewLayoutType.askPhone]: AskPhoneNodeContent,
  [sideViewLayoutType.askEmail]: AskEmailNodeContent,
  [sideViewLayoutType.askFile]: AskFileNodeContent,
  [sideViewLayoutType.askAddress]: AskAddressNodeContent,
  [sideViewLayoutType.askUrl]: AskUrlNodeContent,
  [sideViewLayoutType.opinionScale]: OpinionScaleNodeContent,
  [sideViewLayoutType.rating]: RatingNodeContent,
  [sideViewLayoutType.abTesting]: ABTestingNodeContent,
  [sideViewLayoutType.messageMedia]: MessageMediaNodeContent,
  [sideViewLayoutType.yesNo]: YesNoNodeContent,
  [sideViewLayoutType.buttons]: ButtonNodeContent,
  [sideViewLayoutType.date]: DateNodeContent,
  [sideViewLayoutType.pictureChoice]: PictureChoiceNodeContent,
  [sideViewLayoutType.multiQuestions]: MultiQuestionsNodeContent,
  [sideViewLayoutType.forms]: FormNodeContent,
  [sideViewLayoutType.botJump]: BotJumpNodeContent,
  [sideViewLayoutType.goal]: GoalNodeContent,
  [sideViewLayoutType.persistentMenu]: PersistentMenuNodeContent,
  [sideViewLayoutType.leadScoring]: LeadScoringNodeContent,
  [sideViewLayoutType.emailIntegration]: EmailIntegrationContent,
  [sideViewLayoutType.aiFaq]: AIFAQNodeContent,
  [sideViewLayoutType.businessHours]: BusinessHoursNodeContent,
  [sideViewLayoutType.humanTakeover]: HumanTakeoverNodeContent,
  [sideViewLayoutType.triggerAutomation]: TriggerAutomationNodeContent,
  [sideViewLayoutType.slackIntegration]: SlackNodeContent,
  [sideViewLayoutType.googleSheets]: GoogleSheetsNodeContent,
  [sideViewLayoutType.zapier]: ZapierNodeContent,
  [sideViewLayoutType.calendly]: CalendlyNodeContent,
  [sideViewLayoutType.googleAnalytics]: GoogleAnalyticsNodeContent,
  [sideViewLayoutType.note]: NoteNodeContent,
  [sideViewLayoutType.webhook]: WebhookNodeContent,
  [sideViewLayoutType.mailchimp]: MailchimpNodeContent,
  [sideViewLayoutType.hubspot]: HubspotNodeContent,
};
