import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Checkpoint from './components/checkpoint/Checkpoint';
import Exercise from './components/exercise/Exercise';
import KnowledgeArea from './components/knowledgearea/KnowledgeArea';
import Question from './components/question/Question';
import Checklist from './components/checklist/Checklist';
import Candidate from './components/candidate/Candidate';
import InterviewSession from './components/interviewsession/InterviewSession';
import RecruitPosition from './components/recruitposition/RecruitPosition';
import User from './components/user/User';
import Home from './components/home/Home';
import './index.css';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

ReactDOM.render(
	<Router history = {browserHistory}>
      	<Route path="/" component={App}>
	      	<IndexRoute component={Home} />
	      	<Route path="/home" component={Home} key='0'/>
		    <Route path="/checkpoints" component={Checkpoint} key='1'>
		    	<Route path="/checkpoints/:id" key='1_1'/>
		    </Route>
		    <Route path="/questions"  component={Question}  key='2'/>
		    <Route path="/exercises"  component={Exercise}  key='3'>
		    	<Route path="/exercises/:id" key='3_1'/>
		    </Route>
		    <Route path="/knowledge"  component={KnowledgeArea}  key='4'>
		    	<Route path="/knowledge/:id" key='4_1'/>
		    </Route>
		    <Route path="/checklists"  component={Checklist}  key='5'>
		    	<Route path="/checklists/:id" key='5_1'/>
		    </Route>
		    <Route path="/candidates"  component={Candidate}  key='6'>
		    	<Route path="/candidates/:id" key='6_1'/>
		    </Route>
		    <Route path="/interviewsession"  component={InterviewSession}  key='7'>
		    	<Route path="/interviewsession/:id" key='7_1'/>
		    </Route>
		    <Route path="/user"  component={User}  key='8'>
		    	<Route path="/user/:id" key='8_1'/>
		    </Route>
		    <Route path="/position"  component={RecruitPosition}  key='9'>
		    	<Route path="/position/:id" key='9_1'/>
		    </Route>
	    </Route>
   </Router>,
  document.getElementById('root')
);
