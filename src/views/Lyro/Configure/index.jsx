import React, { useState } from 'react';
import TabComponent from '../../../components/TabComponent/Tab';
import Button from './Items/Button';
import FormField from './Items/FormField';
import Section from './Items/Section';
import Lyroheader from '../../../components/LyroAi/Lyroheader';
import Switch from './Items/Switch';
import TextareaWithButtons from './Items/TextAreaButton';
import { FlagIcon, LeftArowIcons, MessengerIcon, TicketIcon } from '../../Unassigned/icons';
import SelectField from './Items/SelectField';

const Personality = () => {
    // Define state variables
    const [chatbotName, setChatbotName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [toneOfVoice, setToneOfVoice] = useState('Neutral');
    const [isEmojiEnabled, setIsEmojiEnabled] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValues, setSelectedValues] = useState('');


    // Define the handler function
    const handleTestLyro = () => {
        console.log("Testing Lyro with the following settings:");
        console.log("Chatbot Name:", chatbotName);
        console.log("Company Description:", companyDescription);
        console.log("Tone of Voice:", toneOfVoice);
    };


    const operators = [
        { label: 'Transfer conversation to operator', icon: <LeftArowIcons />, value: 'Transfer conversation to operator' },
        { label: 'Keep conversation (no transfer to operator)', icon: <MessengerIcon />, value: 'Keep conversation (no transfer to operator)' },
        { label: 'Create a ticket', icon: <TicketIcon />, value: 'Create a ticket' },
    ];

    const predefined = [
        {
            label: 'English',
            icon: '',
            content: (
                <>
                    <TextareaWithButtons
                        label='Transfer conversation (operators are online)'
                        name='messagesNames.TRANSFER_TO_OPERATOR_WHILE_PROJECT_ONLINE_MESSAGE.en'
                        placeholder='Absolutely! I`m transferring you to a human right away'
                        buttonTextA='Save'
                        rows='4'
                        buttonTextB='Reset to default'
                    />
                    <TextareaWithButtons
                        label='Transfer conversation (operators are online)'
                        name='messagesNames.TRANSFER_TO_OPERATOR_WHILE_PROJECT_ONLINE_MESSAGE.en'
                        placeholder="Currently, the team is unavailable, so I can't connect you. 😔 I'll pass along your message to our team, and they will contact you later."
                        buttonTextA='Save'
                        rows='4'
                        buttonTextB='Reset to default'
                    />
                    <TextareaWithButtons
                        label='Keep conversation (no transfer to operator)'
                        name='messagesNames.TRANSFER_TO_OPERATOR_WHILE_PROJECT_ONLINE_MESSAGE.en'
                        placeholder="I'm sorry, the team is unavailable, so I can't connect you. 😔 Please try asking the question differently so I can help you better."
                        buttonTextA='Save'
                        rows='4'
                        buttonTextB='Reset to default'
                    />

                </>
            ),
        },
    ]

    const configure = [
        {
            label: 'General',
            icon: '',
            to: '/configure/general',
            content: (
                <>
                    <Section title="Main" description="">
                        <Switch
                            checked={isEmojiEnabled}
                            onChange={() => setIsEmojiEnabled(!isEmojiEnabled)}
                            info=''
                            label="Activate"
                        />
                        <FormField
                            label="Lyro responds"
                            info=''
                            value={chatbotName}
                            onChange={(e) => setChatbotName(e.target.value)}
                        />
                    </Section>
                    <Section title="Languages" description="Lyro automatically responds in the visitor's chat widget language. You can set or add more languages in multilanguage widget settings.">
                    </Section>
                    <Section
                        titleIcon={<span className="icon-class"><FlagIcon /></span>}
                        title="EN - English (default)" description="Supported languages for Lyro are English, Spanish, German, Portuguese, French, Dutch, Swedish, Norwegian, Slovene, Polish, Danish, Dutch and Italian. Learn more">
                    </Section>
                </>
            ),
        },
        {
            label: 'Personality',
            icon: '',
            to: '/configure/personality',
            content: (
                <>

                    <Section title="Identity" description="Change the name of your AI Chatbot and add your company description.">
                        <FormField
                            label="AI Chatbot name"
                            info='AI Chatbot uses this name when answering questions about their identity'
                            value={chatbotName}
                            onChange={(e) => setChatbotName(e.target.value)}
                        />
                        <div className='text_areas'>
                            <FormField
                                label="Company description"
                                info='Describe your business so the AI Chatbot can tailor responses to your customers'
                                placeholder="Describe your business..."
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                                required
                            />
                        </div>
                    </Section>
                    <Section title="Answer personalisation" description="Customize style of responses">
                        <Switch
                            checked={isEmojiEnabled}
                            onChange={() => setIsEmojiEnabled(!isEmojiEnabled)}
                            info='Enable emoji in Lyro’s messages'
                            label="Use emojis 😀"
                        />
                        <FormField
                            label="Tone of voice"
                            value={toneOfVoice}
                            onChange={(e) => setToneOfVoice(e.target.value)}
                        />
                    </Section>
                    <Section title="Predefined answers" description="Customize responses to fit your needs and preferences">
                        <TabComponent tabs={predefined} />
                    </Section>
                </>
            ),
        },
        {
            label: 'Conversation Handoff',
            icon: '',
            to: '/configure/conversation-handoff',
            content: (
                <Section title="" description="Choose how Lyro will behave in chat when a visitor asks for operator help.">
                    <div>
                        <SelectField
                            label="When operators are online"
                            info="Please select an option."
                            options={operators}
                            value={selectedValues}
                            onChange={setSelectedValues} // Pass the setter function directly
                            required
                        />
                    </div>
                    <div>
                        <SelectField
                            label="When operators are online"
                            info="Please select an option."
                            options={operators}
                            value={selectedValue}
                            onChange={setSelectedValue} // Pass the setter function directly
                            required
                        />
                    </div>
                </Section>
            ),
        },
    ];








    return (
        <div className='configure_info'>
            <Lyroheader
                title='Configure'
                text=''
                Fhref='/'
                FIcon=''
                buttonText='Test Lyro'
                onButtonClick={handleTestLyro}
                Sclass='add_new_deta'
                buttonSText='Activated'
            />
            <TabComponent tabs={configure} />
        </div>
    );
};

export default Personality;
