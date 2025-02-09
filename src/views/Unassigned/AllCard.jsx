import React from 'react'
import { WhatsappIcon, InstagramIcon, MessengerIcon, TidioWidget, Email } from './icons';  // Ensure these icons are correctly imported from your project
import {HeadingH, Heading, Paragraph, ParagraphDescription, Column, ButtonM, Button, CardTop, Card, IntegrationCard, IconWrapper, TextWrapper, MainLayout, SideBar} from './StylingConst';
import styled from 'styled-components';

function AllCard() {
  return (
    <Card>
        <IntegrationCard>
          <IconWrapper>
            <WhatsappIcon />
          </IconWrapper>
          <TextWrapper>
            <Heading>WhatsApp</Heading>
            <Paragraph>Integrate with WhatsApp and stay connected with your customers.</Paragraph>
            <Button>Integrate</Button>
          </TextWrapper>
        </IntegrationCard>

        <IntegrationCard>
          <IconWrapper>
            <InstagramIcon />
          </IconWrapper>
          <TextWrapper>
            <Heading>Instagram</Heading>
            <Paragraph>Keep in touch with your Instagram customers. </Paragraph>
            <Button>Integrate</Button>
          </TextWrapper>
        </IntegrationCard>

        <IntegrationCard>
          <IconWrapper>
            <MessengerIcon />
          </IconWrapper>
          <TextWrapper>
            <Heading>Facebook Messenger</Heading>
            <Paragraph>Do it now and start responding to queries from Messenger.</Paragraph>
            <Button>Integrate</Button>
          </TextWrapper>
        </IntegrationCard>

        <IntegrationCard>
          <IconWrapper>
            <TidioWidget />
          </IconWrapper>
          <TextWrapper>
            <Heading>Tidio Widget</Heading>
            <Paragraph>Install widget and start supporting customers on your website.</Paragraph>
            <Button>Install Widget</Button>
          </TextWrapper>
        </IntegrationCard>

        <IntegrationCard>
          <IconWrapper>
            <Email />
          </IconWrapper>
          <TextWrapper>
            <Heading>Email</Heading>
            <Paragraph>Connect your mailbox and receive or send emails from the app.</Paragraph>
            <Button>Add Email</Button>
          </TextWrapper>
        </IntegrationCard>
      </Card>
  )
}

export default AllCard
