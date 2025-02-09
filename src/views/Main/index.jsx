import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../components/Main';
import BotBuilder from '../canvas';
import LiveChat from '../LiveChat/index'
import Assigned from '../../pages/assigned'
import Unassigned from '../../pages/unassigned'
import LiveBot from '../../pages/livebot'
import PlayGround from '../../pages/playground'
import Solved from '../../pages/solved'
import DataSources from '../../pages/data-source'
import SignIn from '../../pages/login'
import SignUp from '../../pages/signup'
import GetDataSource from '../../pages/getdatasource'
import Suggestions from '../../pages/suggestions';
import UserMessages from '../../pages/usermessage';
import Hub from '../../pages/hub'
import Configure from '../../pages/Lyro/configure';
import Installattion from '../../pages/installattion'
import BotFlow from '../../pages/botflow';
import Canvas from '../../pages/canvas';

function MainApp() {
  return (
    <Routes>
      <Route path='/*' element={<Canvas />} />
      {/* <Route path='/' element={<BotBuilder />} /> */}
      <Route path='/bot/builder/:id' element={<BotBuilder />} />
      <Route path='/live-chat' element={<LiveChat />} />
      <Route path='/assigned' element={<Assigned />} />
      <Route path='/unassigned' element={<Unassigned />} />
      <Route path='/livebot' element={<LiveBot />} />
      <Route path='/play-ground' element={<PlayGround />} />
      <Route path='/solved' element={<Solved />} />
      <Route path='/data-sources' element={<DataSources />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/data-sources/added' element={<GetDataSource />} />
      <Route path='/suggestions' element={<Suggestions/> }/>
      <Route path='/user-message' element={<UserMessages/> }/>
      <Route path='/hub' element={<Hub/> }/>
      <Route path='/configure/general' element={<Configure/> }/>
      <Route path='/configure/personality' element={<Configure/> }/>
      <Route path='/configure/conversation-handoff' element={<Configure/> }/>
      <Route path='/installation' element={<Installattion/> }/>
      <Route path='/botflow' element={<BotFlow/> }/>
    </Routes>
  );
}

export default MainApp;
