import styled from 'styled-components';

// Main layout for the page
export const MainLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
`;

// Sidebar for customers
export const SideBar = styled.div`
    width: 320px;
    background-color: rgb(255, 255, 255);
    border-width: 1px 0px 1px 1px;
    border-style: solid;
    border-color: rgb(226, 232, 239);
    border-image: initial;
    border-radius: 16px 0px 0px 16px;
    color: rgb(8, 15, 26);
    display: flex;
    flex-direction: column;
    height: calc(100% - 12px);
    position: relative;
    margin-bottom: 12px;
    padding:0px 24px;

    h3 {
        padding: 20px 0px;
        flex: 0 0 58px;
        display: flex;
        position: relative;
        flex-direction: column;
        margin-top: 0px;
        margin-bottom: 0px;
        font-weight: 500;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: -0.01em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .actions {
        display: flex;
        justify-content: end;
        padding: 20px 24px 16px;

        button {
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;

            &:not(:last-child) {
                margin-right: 4px;
            }
            a{
                color: white;
                text-decoration : none;
            }
        }
    }

    .customer-list {
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
            --surface-color: #f5f7f9;
            color: rgb(8, 15, 26);
            z-index: 1;
            margin: 0px 0px 4px ;
            padding: 12px 12px 12px 12px;
            position: relative;
            border-radius: 8px;
            color: rgb(8, 15, 26);
            background-color: var(--surface-color);
            &.active {
                background-color: #e8f4ff;
            }
            input[type='checkbox'] {
                margin-right: 10px;
                margin-top:6px;
                min-width: 20px;
                align-self: baseline;
                fill: rgb(100, 116, 145);
                min-height: 20px;
            }

            .customer-info {
                flex-grow: 1;
                h4 {
                    margin-top: 0px;
                    margin-bottom: 0px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    letter-spacing: -0.01em;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                span.timestamp {
                    margin-top: 0px;
                    margin-bottom: 0px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    letter-spacing: -0.01em;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: right;
                    flex-shrink: 0;
                }
                p {
                    margin: 5px 0;
                    font-size: 0.9rem;
                    color: #555;
                    margin-top: 0px;
                    margin-bottom: 0px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    letter-spacing: -0.01em;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: rgb(100, 116, 145);
                }
                h6 {
                    display: flex;
                    flex-direction: row;
                    -webkit-box-pack: start;
                    justify-content: flex-start;
                    -webkit-box-align: center;
                    align-items: center;
                    margin-top: 4px;
                }
                .email_custmr {
                    display: flex;
                    flex-direction: row;
                    -webkit-box-pack: start;
                    justify-content: flex-start;
                    -webkit-box-align: center;
                    align-items: center;
                    height: 20px;
                    justify-content: space-between;
                }
            }

            &:hover {
                background-color: #f0f0f0;
            }
        }
    }

    p {
        font-size: 0.85rem;
        color: #666;
        margin-top: 10px;
    }
`;

// Main column for the chat section
export const Column = styled.div`
    width: 50%;
    padding: 0px ;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-left : 1px solid #DDDDDD;
    border-right : 1px solid #DDDDDD;
`;

// Chat section styling
export const ChatSection = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    
    h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
    }
    .chat_both {
        width: 100%;
        float: left;
        margin-top: 0px;
        margin-left:44px;
    }

    .date-header:before {
        content: "";
        display: block;
        border-top: 1px solid rgb(211, 219, 229);
        position: relative;
        top: 10px;
    }
    .date-header h4 {
        background-color: rgb(255, 255, 255);
        padding: 0px 30px;
        position: relative;
        width: max-content;
        margin: 0 auto;
    }

    .messages-list {
        flex-grow: 1;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
        overflow-y: auto;
        display: flex;
        height: 50vh;
        flex-direction: column;
    }

    .chat_btm {
            border-top: 3px solid rgb(5, 102, 255);
            width: 100%;
            background-color: rgb(255, 255, 255);
            transition: border-color 0.2s, background-color;
            position: relative;
            min-height: 143px;
            flex-shrink: 0;
        form {
            width: 100%;
        }
        position: relative;
        textarea {
            font-size: 16px;
            line-height: 20px;
            letter-spacing: -0.01em;
            border: 2px solid transparent;
            border-radius: 8px;
            resize: none;
            outline: none;
            border-color: transparent;
            background-color: transparent;
            height: 55.2px !important;
            width: 100%;
            padding: 16px 64px 16px 14px;
            color: rgb(8, 15, 26);
            scrollbar-color: rgb(211, 219, 229) transparent;
            scrollbar-width: thin;
        }
    }
    .input-section {
        display: flex;
        align-items: center;

        input {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px 0px 0px 5px;
            margin-right: 0px;
        }

        button {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 0px 5px 5px 0px;
            cursor: pointer;
            margin-left : -6px;

            &:hover {
                background-color: #218838;
            }
            a{
                color: #fff;
                text-decoration : none;
            }
        }
    }
`;

// Message styling for individual messages
export const Message = styled.div`
    padding: 10px;
    margin-bottom: 0px;
    border-radius: 5px;
    align-self: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
    align-self: ${({ sender }) => (sender === 'customer' ? 'flex-start' : 'flex-end')};
    float: ${({ sender }) => (sender === 'customer' ? 'right' : 'left')};
    width: ${({ sender }) => (sender === 'customer' ? 'auto' : '100%')};
    float: ${({ sender }) => (sender === 'user' ? 'left' : 'right')};
    width: ${({ sender }) => (sender === 'user' ? '100%' : 'auto')};
    width: ${({ sender }) => (sender === 'bot' ? '100%' : 'auto')};

    .sc-dntaoT.hOaCOj 
    .message-content {
        justify-content:end;
    }
    .message-content {
        display: flex;
        align-items: center;
        margin: 5px 0;
        flex-wrap: wrap;
    }
    .message-content.system_chat {
        flex-direction: row-reverse;
        justify-content: center;
        gap: 12px;
        align-items: center;
    }
    .message-content.system_chat .chat_both{
        width: auto !important;
    }

    .customer-icon {
        background: #4167EC;
        font-size: 15px;
        margin-right: 8px;
        border-radius: 50px;
        padding: 2px;
        width: 25px;
        height: 25px;
        display: flex;
        margin-left:10px;
        align-items: center;
        justify-content: center;
        fill: #fff !important;
        color: #fff !important;
    }

    .timestamp {
        margin-left: 10px;
        font-size: 0.8em;
        color: gray;
    }
    span {
        font-weight: bold;
        margin-right: 8px;
        font-family: 'circular';
        font-weight: 500;
        color: #323232;
        font-size: 16px;
    }
    chat_both {
        width: 100%;
        float: left;
        margin-left: 29px;
        margin-top: 0px;
        margin-left:34px;
    }
`;

// Customer Info section (right sidebar)
export const CustomerInfo = styled.div`
    padding: 20px;
    border-left: 1px solid #ddd;

    h3 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
    }

    p {
        margin-bottom: 10px;
        font-size: 0.9rem;
        color: #555;

        strong {
            font-weight: bold;
        }
    }
`;

// Action buttons container (optional)
export const ActionButton = styled.button`
    background-color: ${({ color }) => color || '#007bff'};
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: ${({ hoverColor }) => hoverColor || '#0056b3'};
    }
    a{
        color: #fff;
        text-decoration : none;
    }
`;
