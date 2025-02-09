// pages/index.js
import Button from './Button';
import Instructions from './Instructions';
import Lyroheader from '../../components/LyroAi/Lyroheader';
import { MdRefresh } from 'react-icons/md';
import '../Styles/hub.css'
import ResolutionRate from './ResolutionRate';
import { Question, Browser, question, ResolutionRateIcon, Copy } from '../Unassigned/icons';
import UnansweredQuestions from './UnansweredQuestions';

const Home = () => {
    return (
        <div className=''>
            <Lyroheader
                title='Hub'
                text=''
                FIcon={<MdRefresh />}
                buttonText='Test Lyro'
                buttonSText='Activate'
                Sclass='add_new_deta'
                SIcon={<MdRefresh />}
            />

            <div className='inr_dat_instruction_box'>
                <Instructions />
            </div>

            <div className='box_instruction'>

                <div className='inr_dat_instruction_box'>
                    <ResolutionRate
                        Icon={<ResolutionRateIcon />}
                        Title="Resolution rate"
                        percentage="0%"
                        isButtonDisabled={false}
                        buttonText='Show'
                    />
                </div>
                <div className='inr_dat_instruction_box'>
                    <ResolutionRate
                        Icon={<ResolutionRateIcon />}
                        Title="Answer rate"
                        percentage="0%"
                        isButtonDisabled={false}
                        buttonText='Show'
                    />
                </div>
                <div className='inr_dat_instruction_box'>
                    <ResolutionRate
                        Icon={<ResolutionRateIcon />}
                        Title="Transferred to operator"
                        percentage="0"
                        isButtonDisabled={false}
                        buttonText='Configure handoff'
                    />
                </div>
                <div className='inr_dat_instruction_box'>

                    <ResolutionRate
                        Icon={<ResolutionRateIcon/>}
                        Title="Time saved"
                        percentage="0min"
                        isButtonDisabled={false}
                        buttonText=''
                    />
                </div>
                <div className='inr_dat_instruction_box'>

                    <ResolutionRate
                        Icon={<ResolutionRateIcon />}
                        Title="Conversations limit"
                        percentage="0 / 50"
                        isButtonDisabled={false}
                        buttonText='Upgrade'
                    />
                </div>
            </div>

            <div className='space_b_t'>
                <p className="resolution-rate-label">View full analytics</p>
            </div>

            <div className='some_blocks inr_dat_instruction_box'>
                <UnansweredQuestions
                    Icon={<Question/>}
                    title='Unanswered questions'
                    subText='Questions that Lyro doesn’t know how to answer'
                    text='0 unanswered'
                    buttonLabel='Manage'
                />
            </div>
            <div className='some_blocks inr_dat_instruction_box'>
                <UnansweredQuestions
                    Icon={<Browser/>}
                    title='Unanswered questions'
                    subText='Questions that Lyro doesn’t know how to answer'
                    text='0 unanswered'
                    buttonLabel='Manage'
                />
            </div>
            <div className='some_blocks inr_dat_instruction_box'>
                <UnansweredQuestions
                    Icon={<Copy/>}
                    title='Unanswered questions'
                    subText='Questions that Lyro doesn’t know how to answer'
                    text='0 unanswered'
                    buttonLabel='Manage'
                />
            </div>
        </div>
    );
};

export default Home;
