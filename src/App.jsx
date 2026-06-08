import React, { useState, useRef, useEffect, useCallback } from "react";
import './App.css';

/* -- DATA ----------------------------------------------------------- */
const GROUPS={A:{teams:["Mexico","South Africa","South Korea","Czechia"]},B:{teams:["Canada","Bosnia & Herz.","Switzerland","Qatar"]},C:{teams:["Brazil","Morocco","Scotland","Haiti"]},D:{teams:["USA","Paraguay","Australia","Turkiye"]},E:{teams:["Germany","Ecuador","Ivory Coast","Curacao"]},F:{teams:["Netherlands","Japan","Sweden","Tunisia"]},G:{teams:["Belgium","Egypt","Iran","New Zealand"]},H:{teams:["Spain","Cape Verde","Saudi Arabia","Uruguay"]},I:{teams:["France","Senegal","Norway","Iraq"]},J:{teams:["Argentina","Algeria","Austria","Jordan"]},K:{teams:["Portugal","DR Congo","Uzbekistan","Colombia"]},L:{teams:["England","Croatia","Ghana","Panama"]}};

const DAY_DATES={1:"2026-06-11",2:"2026-06-12",3:"2026-06-13",4:"2026-06-14",5:"2026-06-15",6:"2026-06-16",7:"2026-06-17",8:"2026-06-18",9:"2026-06-19",10:"2026-06-20",11:"2026-06-21",12:"2026-06-22",13:"2026-06-23",14:"2026-06-24",15:"2026-06-25",16:"2026-06-26",17:"2026-06-27",18:"2026-06-28",19:"2026-06-29",20:"2026-06-30",21:"2026-07-01",22:"2026-07-02",23:"2026-07-03",24:"2026-07-04",25:"2026-07-05",26:"2026-07-06",27:"2026-07-07",28:"2026-07-09",29:"2026-07-10",30:"2026-07-11",31:"2026-07-14",32:"2026-07-15",33:"2026-07-18",34:"2026-07-19"};

const DAYS=[
{day:1,date:"Thu June 11",theme:"Defense",games:["Mexico vs South Africa","South Korea vs Czechia"]},
{day:2,date:"Fri June 12",theme:"Attacking",games:["Canada vs Bosnia & Herz.","USA vs Paraguay"]},
{day:3,date:"Sat June 13",theme:"Player Tracking",games:["Qatar vs Switzerland","Brazil vs Morocco","Haiti vs Scotland"]},
{day:4,date:"Sun June 14",theme:"Key Moments",games:["Australia vs Turkiye","Germany vs Curacao","Netherlands vs Japan","Ivory Coast vs Ecuador","Sweden vs Tunisia"]},
{day:5,date:"Mon June 15",theme:"Set Pieces",games:["Spain vs Cape Verde","Belgium vs Egypt","Saudi Arabia vs Uruguay","Iran vs New Zealand"]},
{day:6,date:"Tue June 16",theme:"Tactical",games:["France vs Senegal","Iraq vs Norway","Argentina vs Algeria"]},
{day:7,date:"Wed June 17",theme:"Defense",games:["Austria vs Jordan","Portugal vs DR Congo","England vs Croatia","Ghana vs Panama","Uzbekistan vs Colombia"]},
{day:8,date:"Thu June 18",theme:"Attacking",games:["Czechia vs South Africa","Switzerland vs Bosnia & Herz.","Canada vs Qatar","Mexico vs South Korea"]},
{day:9,date:"Fri June 19",theme:"Player Tracking",games:["USA vs Australia","Scotland vs Morocco","Brazil vs Haiti","Turkiye vs Paraguay"]},
{day:10,date:"Sat June 20",theme:"Key Moments",games:["Netherlands vs Sweden","Germany vs Ivory Coast","Ecuador vs Curacao"]},
{day:11,date:"Sun June 21",theme:"Set Pieces",games:["Tunisia vs Japan","Spain vs Saudi Arabia","Belgium vs Iran","Uruguay vs Cape Verde","New Zealand vs Egypt"]},
{day:12,date:"Mon June 22",theme:"Tactical",games:["Argentina vs Austria","France vs Iraq","Norway vs Senegal","Jordan vs Algeria"]},
{day:13,date:"Tue June 23",theme:"Defense",games:["Portugal vs Uzbekistan","England vs Ghana","Panama vs Croatia","Colombia vs DR Congo"]},
{day:14,date:"Wed June 24",theme:"Attacking",games:["Switzerland vs Canada","Bosnia & Herz. vs Qatar","Scotland vs Brazil","Morocco vs Haiti","Czechia vs Mexico","South Africa vs South Korea"]},
{day:15,date:"Thu June 25",theme:"Player Tracking",games:["Curacao vs Ivory Coast","Ecuador vs Germany","Japan vs Sweden","Tunisia vs Netherlands","Turkiye vs USA","Paraguay vs Australia"]},
{day:16,date:"Fri June 26",theme:"Key Moments",games:["Norway vs France","Senegal vs Iraq","Cape Verde vs Saudi Arabia","Uruguay vs Spain","Egypt vs Iran","New Zealand vs Belgium"]},
{day:17,date:"Sat June 27",theme:"Set Pieces",games:["Panama vs England","Croatia vs Ghana","Colombia vs Portugal","DR Congo vs Uzbekistan","Algeria vs Austria","Jordan vs Argentina"]},
{day:18,date:"Sun June 28",theme:"Tactical",games:["Round of 32 Match 1","Round of 32 Match 2"]},
{day:19,date:"Mon June 29",theme:"Defense",games:["Round of 32 Match 3","Round of 32 Match 4","Round of 32 Match 5"]},
{day:20,date:"Tue June 30",theme:"Attacking",games:["Round of 32 Match 6","Round of 32 Match 7","Round of 32 Match 8"]},
{day:21,date:"Wed July 1",theme:"Player Tracking",games:["Round of 32 Match 9","Round of 32 Match 10","Round of 32 Match 11"]},
{day:22,date:"Thu July 2",theme:"Key Moments",games:["Round of 32 Match 12","Round of 32 Match 13","Round of 32 Match 14"]},
{day:23,date:"Fri July 3",theme:"Set Pieces",games:["Round of 32 Match 15","Round of 32 Match 16"]},
{day:24,date:"Sat July 4",theme:"Tactical",games:["Round of 16 Match 1","Round of 16 Match 2"]},
{day:25,date:"Sun July 5",theme:"Defense",games:["Round of 16 Match 3","Round of 16 Match 4"]},
{day:26,date:"Mon July 6",theme:"Attacking",games:["Round of 16 Match 5","Round of 16 Match 6"]},
{day:27,date:"Tue July 7",theme:"Player Tracking",games:["Round of 16 Match 7","Round of 16 Match 8"]},
{day:28,date:"Thu July 9",theme:"Key Moments",games:["Quarterfinal 1"]},
{day:29,date:"Fri July 10",theme:"Set Pieces",games:["Quarterfinal 2"]},
{day:30,date:"Sat July 11",theme:"Tactical",games:["Quarterfinal 3","Quarterfinal 4"]},
{day:31,date:"Tue July 14",theme:"Defense",games:["Semifinal 1"]},
{day:32,date:"Wed July 15",theme:"Attacking",games:["Semifinal 2"]},
{day:33,date:"Sat July 18",theme:"Player Tracking",games:["Third Place Match"]},
{day:34,date:"Sun July 19",theme:"Key Moments",games:["THE FINAL - MetLife Stadium"]},
];

const R32_MATCHES=[
{id:"r32_1",date:"Sun Jun 28",home:"Winner Group B",away:"Runner-up Group A",venue:"Toronto"},
{id:"r32_2",date:"Sun Jun 28",home:"Winner Group A",away:"3rd Place C/E/F/H/I",venue:"Mexico City"},
{id:"r32_3",date:"Mon Jun 29",home:"Winner Group C",away:"Runner-up Group F",venue:"Houston"},
{id:"r32_4",date:"Mon Jun 29",home:"Winner Group E",away:"3rd Place A/B/C/D/F",venue:"Foxborough"},
{id:"r32_5",date:"Mon Jun 29",home:"Winner Group F",away:"Runner-up Group C",venue:"Guadalajara"},
{id:"r32_6",date:"Tue Jun 30",home:"Runner-up Group E",away:"Runner-up Group I",venue:"Arlington"},
{id:"r32_7",date:"Tue Jun 30",home:"Winner Group I",away:"3rd Place C/D/F/G/H",venue:"East Rutherford"},
{id:"r32_8",date:"Wed Jul 1",home:"Winner Group L",away:"3rd Place E/H/I/J/K",venue:"Atlanta"},
{id:"r32_9",date:"Wed Jul 1",home:"Winner Group G",away:"3rd Place A/E/H/I/J",venue:"Seattle"},
{id:"r32_10",date:"Wed Jul 1",home:"Winner Group D",away:"3rd Place B/E/F/I/J",venue:"Santa Clara"},
{id:"r32_11",date:"Thu Jul 2",home:"Winner Group H",away:"Runner-up Group J",venue:"Inglewood"},
{id:"r32_12",date:"Thu Jul 2",home:"Winner Group J",away:"Runner-up Group K",venue:"Miami"},
{id:"r32_13",date:"Thu Jul 2",home:"Winner Group K",away:"Runner-up Group L",venue:"Kansas City"},
{id:"r32_14",date:"Fri Jul 3",home:"Runner-up Group B",away:"Runner-up Group D",venue:"Vancouver"},
{id:"r32_15",date:"Fri Jul 3",home:"Runner-up Group G",away:"Runner-up Group H",venue:"Dallas"},
{id:"r32_16",date:"Fri Jul 3",home:"Runner-up Group K",away:"3rd Place A/B/G/J/L",venue:"Philadelphia"},
];

const R16_MATCHES=[
{id:"r16_1",date:"Sat Jul 4",home:"W R32-1",away:"W R32-2",venue:"MetLife"},
{id:"r16_2",date:"Sat Jul 4",home:"W R32-3",away:"W R32-4",venue:"Houston"},
{id:"r16_3",date:"Sun Jul 5",home:"W R32-5",away:"W R32-6",venue:"SoFi"},
{id:"r16_4",date:"Sun Jul 5",home:"W R32-7",away:"W R32-8",venue:"Atlanta"},
{id:"r16_5",date:"Mon Jul 6",home:"W R32-9",away:"W R32-10",venue:"Seattle"},
{id:"r16_6",date:"Mon Jul 6",home:"W R32-11",away:"W R32-12",venue:"Miami"},
{id:"r16_7",date:"Tue Jul 7",home:"W R32-13",away:"W R32-14",venue:"Kansas City"},
{id:"r16_8",date:"Tue Jul 7",home:"W R32-15",away:"W R32-16",venue:"Dallas"},
];

const QF_MATCHES=[
{id:"qf_1",date:"Thu Jul 9",home:"W R16-1",away:"W R16-2",venue:"MetLife"},
{id:"qf_2",date:"Fri Jul 10",home:"W R16-3",away:"W R16-4",venue:"Dallas"},
{id:"qf_3",date:"Sat Jul 11",home:"W R16-5",away:"W R16-6",venue:"SoFi"},
{id:"qf_4",date:"Sat Jul 11",home:"W R16-7",away:"W R16-8",venue:"Kansas City"},
];

const FEED_FORWARD={
  r32_1:{next:"r16_1",side:"home"},r32_2:{next:"r16_1",side:"away"},
  r32_3:{next:"r16_2",side:"home"},r32_4:{next:"r16_2",side:"away"},
  r32_5:{next:"r16_3",side:"home"},r32_6:{next:"r16_3",side:"away"},
  r32_7:{next:"r16_4",side:"home"},r32_8:{next:"r16_4",side:"away"},
  r32_9:{next:"r16_5",side:"home"},r32_10:{next:"r16_5",side:"away"},
  r32_11:{next:"r16_6",side:"home"},r32_12:{next:"r16_6",side:"away"},
  r32_13:{next:"r16_7",side:"home"},r32_14:{next:"r16_7",side:"away"},
  r32_15:{next:"r16_8",side:"home"},r32_16:{next:"r16_8",side:"away"},
  r16_1:{next:"qf_1",side:"home"},r16_2:{next:"qf_1",side:"away"},
  r16_3:{next:"qf_2",side:"home"},r16_4:{next:"qf_2",side:"away"},
  r16_5:{next:"qf_3",side:"home"},r16_6:{next:"qf_3",side:"away"},
  r16_7:{next:"qf_4",side:"home"},r16_8:{next:"qf_4",side:"away"},
  qf_1:{next:"sf_1",side:"home"},qf_2:{next:"sf_1",side:"away"},
  qf_3:{next:"sf_2",side:"home"},qf_4:{next:"sf_2",side:"away"},
  sf_1:{next:"final_match",side:"home"},sf_2:{next:"final_match",side:"away"},
};

const THEME_QS={
  Defense:{
    prematch:["Before kickoff - which type of tackle do you think you will see the most today: sliding tackle, standing tackle, or a block? Pick one and explain why.","Pick one defender to watch for the whole game. Write their jersey number and team. What do you think their main job on defense will be?"],
    halftime:["So far which type of tackle have you seen the most? Describe one specific tackle and what happened right after.","Does one team need to make a defensive substitution? Which position should come on and why?"],
    postmatch:["Which type of tackle had the biggest impact on the game? Describe who made it, when, and how it changed things.","Find the best defensive play of the whole match. Describe what happened and why it was so important."]
  },
  Attacking:{
    prematch:["Before the game - do you think this team will attack more through the middle or down the wings? Short passes or direct?","Which team do you think will create more scoring chances today and why?"],
    halftime:["Describe one attacking sequence you saw in the first half. Who passed to whom and what happened?","Does one team need an attacking substitution? Which position should come on and why?"],
    postmatch:["Which attacking sequence led to the best goal or closest chance? Break it down step by step.","Did one team mostly attack through the middle or down the wings? Give two examples."]
  },
  "Player Tracking":{
    prematch:["Pick one player to track the entire match. Write their jersey number, team, and position. What will their main job be today?","Count every single time your chosen player touches the ball - start from kickoff. Do they stay in one area or move all over?"],
    halftime:["How many touches has your player had so far? What was their best moment and what could they do better?","Does either team need a substitution? Which position should come on and why?"],
    postmatch:["What was your player's final touch count? Rate them out of 10 with at least two specific examples.","What was your player's single best moment of the match? Describe it in detail."]
  },
  "Key Moments":{
    prematch:["Predict what the turning point will be today. A goal? Red card? Big save? Write your prediction before kickoff.","Which team will have more momentum in the first half and what moment will give it to them?"],
    halftime:["Has there been a turning point yet? Describe exactly what happened and how it shifted momentum.","Does either team need a substitution right now? Which position should come on to change the game?"],
    postmatch:["What was the single biggest turning point of the entire game and why did it matter most?","Choose one moment and explain how the game would have been different without it."]
  },
  "Set Pieces":{
    prematch:["Which team do you think will be better at set pieces today - corners, free kicks, throw-ins? Why?","How do you predict each team will line up for corner kicks? Pack the box or play short?"],
    halftime:["Have you seen any dangerous set pieces? Describe one in detail - who took it, what happened, what was the result?","Does either team need a substitution to help them win or defend set pieces?"],
    postmatch:["Which set piece created the most danger or led to a goal? Describe exactly how the team executed it.","Which team was better at set pieces overall? Give two specific examples."]
  },
  Tactical:{
    prematch:["Watch for when each coach makes substitutions and how the team changes after each one.","Looking at the starting lineups, which team has the better tactical setup today and why?"],
    halftime:["Any substitutions yet? If yes - how did the team change? If no - which position needs to come on and why?","Has either coach changed their tactics since kickoff? What is different now?"],
    postmatch:["Which substitution had the biggest impact? If none stood out, describe one tactical decision that shaped the result.","Which coach made better in-game decisions? Give two specific examples."]
  }
};

const THEME_COLORS={Defense:"#FF4B4B",Attacking:"#00AEEF","Player Tracking":"#9B5DE5","Key Moments":"#F15BB5","Set Pieces":"#FEE440",Tactical:"#00BBF9"};

/* -- SQUAD DATA (confirmed May 2026) -------------------------------- */

/* Key Players to Watch  -  3 spotlight players per team */
const KEY_PLAYERS={
  "Mexico":[
    {name:"Hirving Lozano",pos:"Winger",why:"Explosive pace down the right. Watch his runs in behind the defensive line and how defenders respond."},
    {name:"Edson Alvarez",pos:"Defensive Mid",why:"The engine of Mexico's press. Count how many times he wins the ball back in the first 30 minutes."},
    {name:"Santiago Gimenez",pos:"Striker",why:"Clinical finisher. Watch his movement in the box  -  he rarely stands still."},
  ],
  "South Africa":[
    {name:"Percy Tau",pos:"Winger",why:"South Africa's most creative player. Watch how he receives the ball in tight spaces and turns defenders."},
    {name:"Ronwen Williams",pos:"Goalkeeper",why:"One of the best GKs in Africa. Watch his distribution  -  he starts attacks from the back."},
    {name:"Themba Zwane",pos:"Attacking Mid",why:"Watch his movement between the lines and how he links midfield to attack."},
  ],
  "Canada":[
    {name:"Alphonso Davies",pos:"Left Back",why:"One of the fastest players in the world. Watch his overlapping runs and how defenders track him."},
    {name:"Jonathan David",pos:"Striker",why:"Clinical striker. Watch his movement off the ball and positioning before the pass arrives."},
    {name:"Tajon Buchanan",pos:"Winger",why:"Direct and fast. Watch his 1v1 ability and how he creates space for teammates."},
  ],
  "USA":[
    {name:"Christian Pulisic",pos:"Winger",why:"USA's captain and best player. Watch how he drives at defenders and creates when things are tight."},
    {name:"Weston McKennie",pos:"Midfielder",why:"Box-to-box engine. Count his defensive actions  -  tackles, interceptions, blocks  -  in the first half."},
    {name:"Tyler Adams",pos:"Defensive Mid",why:"The defensive anchor. Watch how he reads the game before the ball arrives and covers his defenders."},
  ],
  "Brazil":[
    {name:"Vinicius Jr",pos:"Winger",why:"The most dangerous winger in the world. Watch how defenders try to double-team him and how he responds."},
    {name:"Rodrygo",pos:"Winger",why:"Intelligent movement and finishing. Watch how he times runs to arrive late into the box."},
    {name:"Marquinhos",pos:"Centre Back",why:"Brazil's defensive leader. Watch how he organizes the back line and steps out to press."},
  ],
  "France":[
    {name:"Kylian Mbappe",pos:"Striker",why:"The best player in the world right now. Watch his movement between defenders and his decision making in the final third."},
    {name:"Antoine Griezmann",pos:"Attacking Mid",why:"The glue of France's attack. Watch how he drops deep to receive and turns defense into attack."},
    {name:"Aurelien Tchouameni",pos:"Defensive Mid",why:"Controls the tempo. Watch how he dictates the speed of France's build-up play."},
  ],
  "Argentina":[
    {name:"Lionel Messi",pos:"Forward",why:"The greatest of all time. Watch how defenders are always aware of where he is even without the ball."},
    {name:"Julian Alvarez",pos:"Striker",why:"Relentless pressing and clinical finishing. Watch how many times he forces defenders into mistakes."},
    {name:"Rodrigo De Paul",pos:"Midfielder",why:"Messi's engine room. Watch how he covers ground and keeps Argentina's shape when they're out of possession."},
  ],
  "England":[
    {name:"Jude Bellingham",pos:"Midfielder",why:"The complete midfielder. Watch how he arrives late into the box from deep  -  he's dangerous every time."},
    {name:"Harry Kane",pos:"Striker",why:"Watch his movement in the final third  -  he drops deep to receive and creates space for runners."},
    {name:"Phil Foden",pos:"Winger",why:"Finds pockets of space nobody else sees. Watch how he drifts inside from the left to create shooting opportunities."},
  ],
  "Germany":[
    {name:"Florian Wirtz",pos:"Attacking Mid",why:"Germany's most exciting player. Watch his quick combinations in tight spaces and his shooting from distance."},
    {name:"Jamal Musiala",pos:"Attacking Mid",why:"Exceptional dribbler. Watch how many touches he takes before opponents can tackle him in tight areas."},
    {name:"Antonio Rudiger",pos:"Centre Back",why:"Intense defender. Watch his aggression stepping to press and how he leads the defensive line."},
  ],
  "Portugal":[
    {name:"Cristiano Ronaldo",pos:"Striker",why:"Watch how he positions himself before crosses arrive  -  his timing in the box is still elite."},
    {name:"Bruno Fernandes",pos:"Attacking Mid",why:"Portugal's creative hub. Watch how many key passes he attempts and his movement off the ball."},
    {name:"Ruben Dias",pos:"Centre Back",why:"One of the best defenders in the world. Watch how he organizes Portugal's shape and reads through balls."},
  ],
  "Spain":[
    {name:"Pedri",pos:"Midfielder",why:"Spain's heartbeat. Watch how he receives under pressure and plays forward  -  he barely loses the ball."},
    {name:"Lamine Yamal",pos:"Winger",why:"The future of football. Watch his confidence taking on defenders and his decision making in the final third."},
    {name:"Rodri",pos:"Defensive Mid",why:"The best defensive midfielder in the world. Watch how he controls tempo and breaks up opposition attacks."},
  ],
  "Netherlands":[
    {name:"Cody Gakpo",pos:"Winger",why:"Direct and powerful. Watch how he drives at full backs and uses his strength to hold off defenders."},
    {name:"Virgil van Dijk",pos:"Centre Back",why:"Elite organizer. Watch how he positions the whole back line and his aerial dominance on set pieces."},
    {name:"Tijjani Reijnders",pos:"Midfielder",why:"Watch his runs from deep into the box  -  he arrives at the right time more than almost any midfielder."},
  ],
  "Belgium":[
    {name:"Kevin De Bruyne",pos:"Midfielder",why:"Still the best passer in the world. Count his through balls and watch how defenders give him space."},
    {name:"Romelu Lukaku",pos:"Striker",why:"Powerful and clinical. Watch how he uses his body to hold up play and create space for teammates."},
    {name:"Leandro Trossard",pos:"Winger",why:"Hardworking and creative. Watch his pressing triggers  -  when does he start Belgium's press?"},
  ],
  "Japan":[
    {name:"Takefusa Kubo",pos:"Winger",why:"Japan's most creative player. Watch his quick feet in 1v1 situations and how defenders try to stop him."},
    {name:"Ritsu Doan",pos:"Winger",why:"Powerful shot and direct running. Watch how he attacks defenders inside and outside."},
    {name:"Wataru Endo",pos:"Defensive Mid",why:"Watch how Japan's shape changes when he's on and off the ball  -  he's the defensive key."},
  ],
  "Morocco":[
    {name:"Hakim Ziyech",pos:"Winger",why:"Gifted left foot. Watch how he cuts inside from the right and creates shooting angles."},
    {name:"Achraf Hakimi",pos:"Right Back",why:"One of the best attacking fullbacks in the world. Watch his overlapping runs and crossing."},
    {name:"Yassine Bounou",pos:"Goalkeeper",why:"World class shot stopper. Watch his positioning and how he organizes the Moroccan defensive shape."},
  ],
  "South Korea":[
    {name:"Son Heung-min",pos:"Winger",why:"South Korea's captain and best player. Watch how he works defensively as much as offensively."},
    {name:"Lee Kang-in",pos:"Midfielder",why:"Creative and technically gifted. Watch how he finds small spaces between defenders."},
    {name:"Kim Min-jae",pos:"Centre Back",why:"Physical dominant defender. Watch his aerial ability and how he steps out to press attackers."},
  ],
  "Switzerland":[
    {name:"Granit Xhaka",pos:"Midfielder",why:"Leader of Switzerland's press. Watch when he triggers pressing and how teammates react."},
    {name:"Xherdan Shaqiri",pos:"Winger",why:"Powerful and direct. Watch his long shots and set piece delivery."},
    {name:"Yann Sommer",pos:"Goalkeeper",why:"Smart sweeper keeper. Watch how far off his line he comes to deal with through balls."},
  ],
  "Croatia":[
    {name:"Luka Modric",pos:"Midfielder",why:"The maestro. Watch how he controls tempo  -  when he speeds up and slows down the game."},
    {name:"Ivan Perisic",pos:"Wing Back",why:"Watch his overlapping runs and delivery  -  Croatia build a lot of their attacks through him."},
    {name:"Josko Gvardiol",pos:"Centre Back",why:"One of the best young defenders in the world. Watch his composure on the ball and his positioning."},
  ],
  "Senegal":[
    {name:"Sadio Mane",pos:"Forward",why:"Africa's best player. Watch how he drifts wide and cuts inside  -  defenders always know where he is."},
    {name:"Ismaila Sarr",pos:"Winger",why:"Explosively fast. Watch his runs in behind defensive lines and how fullbacks deal with him."},
    {name:"Edouard Mendy",pos:"Goalkeeper",why:"One of the best GKs in the world. Watch his decision-making coming off his line."},
  ],
  "Australia":[
    {name:"Mat Ryan",pos:"Goalkeeper",why:"Experienced and vocal. Watch how he organizes Australia's defensive shape on set pieces."},
    {name:"Martin Boyle",pos:"Winger",why:"Pace and directness. Watch his runs in behind and how defenders track him."},
    {name:"Mitchell Duke",pos:"Striker",why:"Physical striker. Watch how he holds up play and brings teammates into the game."},
  ],
  "Uruguay":[
    {name:"Federico Valverde",pos:"Midfielder",why:"Box-to-box powerhouse. Watch how many kilometres he covers and his late runs into the box."},
    {name:"Darwin Nunez",pos:"Striker",why:"Explosive and powerful. Watch his movement and how defenders physically deal with him."},
    {name:"Ronald Araujo",pos:"Centre Back",why:"Physical and dominant. Watch how he deals with aerial balls and steps out to press."},
  ],
  "Ecuador":[
    {name:"Enner Valencia",pos:"Striker",why:"Ecuador's all-time top scorer. Watch his positioning and movement in the penalty area."},
    {name:"Jeremy Sarmiento",pos:"Winger",why:"Quick and direct. Watch how he uses his pace to get in behind defensive lines."},
    {name:"Moises Caicedo",pos:"Midfielder",why:"One of the best defensive midfielders in the world. Watch how he reads the game and intercepts passes."},
  ],
  "Iraq":[
    {name:"Aymen Hussein",pos:"Striker",why:"Iraq's main goal threat. Watch his runs in behind the defensive line and how he holds up play to bring teammates in."},
    {name:"Ali Adnan",pos:"Left Back",why:"Experienced and attack-minded. Watch his overlapping runs down the left and his delivery from wide areas."},
  ],
  "Jordan":[
    {name:"Mousa Tamari",pos:"Winger",why:"Jordan's most creative player. Watch how he uses his quick feet to beat defenders in 1v1 situations on the right side."},
    {name:"Yazan Al-Naimat",pos:"Midfielder",why:"The engine of Jordan's midfield. Watch how he wins second balls and quickly distributes to start attacks."},
  ],
  "Curacao":[
    {name:"Leandro Bacuna",pos:"Midfielder",why:"Curacao's captain and leader. Watch his range of passing and how he drives forward from midfield to create overloads."},
    {name:"Tahith Chong",pos:"Winger",why:"Direct and unpredictable. Watch his 1v1 ability - he looks to drive at defenders rather than pass sideways."},
  ],
  "Haiti":[
    {name:"Jean-Ricner Bellegarde",pos:"Midfielder",why:"Haiti's most technically gifted player. Watch how he receives under pressure and connects midfield to attack."},
    {name:"Frantzdy Pierrot",pos:"Forward",why:"Physical and aggressive. Watch how he uses his body to hold up the ball and bring his teammates into play."},
  ],
  "Cape Verde":[
    {name:"Ryan Mendes",pos:"Winger",why:"Cape Verde's danger man. Watch his direct running at defenders and his ability to cut inside onto his stronger foot."},
    {name:"Jamiro Monteiro",pos:"Midfielder",why:"Box-to-box and energetic. Watch how far he covers in both directions and how he presses opponents high up the pitch."},
  ],
  "Qatar":[
    {name:"Akram Afif",pos:"Winger",why:"Qatar's best player and captain. Watch his clever movement between the lines and his set piece delivery."},
    {name:"Almoez Ali",pos:"Striker",why:"Qatar's all-time top scorer. Watch his intelligent runs to get in behind and his clinical finishing in tight spaces."},
  ],
  "Panama":[
    {name:"Adalberto Carrasquilla",pos:"Midfielder",why:"Panama's creative hub. Watch how he links play between midfield and attack and his range of passing under pressure."},
    {name:"Ismael Diaz",pos:"Forward",why:"Young and dynamic. Watch his pace in behind and how he uses his speed to stretch the defensive line."},
  ],
};

/* Get key players for a selected game */
const getKeyPlayers=(game,dayNum)=>{
  if(!game)return[];
  const teams=game.split(" vs ").map(t=>t.trim());
  const players=[];
  teams.forEach(team=>{
    const tp=KEY_PLAYERS[team];
    if(tp&&tp.length>0){
      players.push({...tp[(dayNum||0)%tp.length],team});
    }
  });
  return players;
};


/* TacticalWord - shows coaching term of the day */
function TacticalWord({dayNum}){
  const tw=TACTICAL_WORDS[dayNum];
  if(!tw)return null;
  return(
    <div style={{background:"rgba(0,187,249,0.07)",border:"1px solid rgba(0,187,249,0.25)",borderRadius:12,padding:14,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
        <span style={{fontSize:16}}>&#129504;</span>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#00BBF9",fontFamily:"DM Sans,sans-serif"}}>Tactical Word of the Day</div>
      </div>
      <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:22,color:"#F5F5F5",letterSpacing:"0.05em",marginBottom:6}}>{tw.word}</div>
      <div style={{fontSize:12,color:"#888",lineHeight:1.6,fontFamily:"DM Sans,sans-serif"}}>{tw.def}</div>
    </div>
  );
}

/* StreakBadges - shows earned badges and next target */
function StreakBadges({streak}){
  if(streak<1)return null;
  const earned=getEarnedBadges(streak);
  const next=getNextBadge(streak);
  return(
    <div style={{background:"rgba(255,100,0,0.06)",border:"1px solid rgba(255,100,0,0.2)",borderRadius:12,padding:14,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
        <span style={{fontSize:16}}>&#128293;</span>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#FF6400",fontFamily:"DM Sans,sans-serif"}}>{streak}-Day Streak</div>
      </div>
      {earned.length>0&&(
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:next?10:0}}>
          {earned.map(b=>(
            <div key={b.id} style={{background:"rgba(255,255,255,0.05)",border:"1px solid #2A2A2A",borderRadius:8,padding:"6px 10px",display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:14}} dangerouslySetInnerHTML={{__html:b.icon}}/>
              <div style={{fontSize:10,fontWeight:700,color:b.color,fontFamily:"DM Sans,sans-serif"}}>{b.label}</div>
            </div>
          ))}
        </div>
      )}
      {next&&(
        <div style={{fontSize:11,color:"#555",fontFamily:"DM Sans,sans-serif"}}>
          {next.days-streak} more day{next.days-streak!==1?"s":""} to earn <span style={{color:next.color,fontWeight:700}}>{next.label}</span> <span dangerouslySetInnerHTML={{__html:next.icon}}/>
        </div>
      )}
    </div>
  );
}

/* PreMatchPredict - lock score prediction before kickoff */
function PreMatchPredict({dayNum,selGame,getScore}){
  const[pred,setPred]=useLS("prematch_pred_"+dayNum,{h:"",a:"",motm:""});
  const[locked,setLocked]=useLS("prematch_lock_"+dayNum,false);
  if(!selGame)return null;
  const pts=selGame.split(" vs ").map(t=>t.trim());
  if(pts.length!==2)return null;
  const liveScore=getScore&&getScore(pts[0],pts[1]);
  const isLive=liveScore&&(liveScore.status==="IN_PLAY"||liveScore.status==="HALFTIME"||liveScore.status==="PAUSED");
  const isFinished=liveScore&&liveScore.status==="FINISHED";

  const lock=()=>{
    if(!pred.h||!pred.a)return;
    setLocked(true);
  };

  return(
    <div style={{background:"rgba(232,255,0,0.06)",border:"1px solid rgba(232,255,0,0.25)",borderRadius:12,padding:14,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:16}}>&#128274;</span>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#E8FF00",fontFamily:"DM Sans,sans-serif"}}>Pre-Match Prediction</div>
        </div>
        {locked&&<div style={{fontSize:9,fontWeight:700,background:"rgba(232,255,0,0.12)",color:"#E8FF00",padding:"3px 8px",borderRadius:20,fontFamily:"DM Sans,sans-serif"}}>LOCKED &#128274;</div>}
      </div>

      {!locked?(
        <>
          <div style={{fontSize:11,color:"#666",marginBottom:10,fontFamily:"DM Sans,sans-serif",lineHeight:1.5}}>Predict the score before kickoff. Once locked you can not change it.</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#F5F5F5",marginBottom:5,fontFamily:"DM Sans,sans-serif"}}>{pts[0]}</div>
              <input type="number" min="0" max="20" value={pred.h} onChange={e=>setPred(p=>({...p,h:e.target.value}))}
                style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid #333",borderRadius:8,padding:"8px",color:"#E8FF00",fontFamily:"Bebas Neue,sans-serif",fontSize:28,textAlign:"center",outline:"none"}}
                placeholder="0"/>
            </div>
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:22,color:"#555"}}>VS</div>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#F5F5F5",marginBottom:5,fontFamily:"DM Sans,sans-serif"}}>{pts[1]}</div>
              <input type="number" min="0" max="20" value={pred.a} onChange={e=>setPred(p=>({...p,a:e.target.value}))}
                style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid #333",borderRadius:8,padding:"8px",color:"#E8FF00",fontFamily:"Bebas Neue,sans-serif",fontSize:28,textAlign:"center",outline:"none"}}
                placeholder="0"/>
            </div>
          </div>
          <button onClick={lock} disabled={!pred.h&&!pred.a}
            style={{width:"100%",background:(!pred.h&&!pred.a)?"#1A1A1A":"#E8FF00",color:(!pred.h&&!pred.a)?"#444":"#000",border:"none",borderRadius:8,padding:"11px",fontFamily:"DM Sans,sans-serif",fontSize:12,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.1em",cursor:(!pred.h&&!pred.a)?"not-allowed":"pointer"}}>
            Lock Prediction &#128274;
          </button>
        </>
      ):(
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,padding:"12px 0",marginBottom:8}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#888",fontFamily:"DM Sans,sans-serif",marginBottom:3}}>{pts[0]}</div>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:48,color:"#E8FF00",lineHeight:1}}>{pred.h||"0"}</div>
            </div>
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:24,color:"#444"}}>-</div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"#888",fontFamily:"DM Sans,sans-serif",marginBottom:3}}>{pts[1]}</div>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:48,color:"#E8FF00",lineHeight:1}}>{pred.a||"0"}</div>
            </div>
          </div>
          {isFinished&&liveScore&&(
            <div style={{background:"rgba(0,200,80,0.08)",border:"1px solid rgba(0,200,80,0.2)",borderRadius:8,padding:"10px 12px",marginTop:6}}>
              <div style={{fontSize:10,fontWeight:700,color:"#00C850",textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"DM Sans,sans-serif",marginBottom:4}}>Final Score</div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif"}}>
                  Actual: <span style={{color:"#F5F5F5",fontWeight:700}}>{liveScore.home} - {liveScore.away}</span>
                </div>
                <div style={{fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif"}}>
                  Your pick: <span style={{color:"#E8FF00",fontWeight:700}}>{pred.h} - {pred.a}</span>
                </div>
                {String(liveScore.home)===String(pred.h)&&String(liveScore.away)===String(pred.a)&&(
                  <div style={{background:"#E8FF00",color:"#000",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,fontFamily:"DM Sans,sans-serif",textTransform:"uppercase"}}>Exact! &#127881;</div>
                )}
              </div>
            </div>
          )}
          {!isFinished&&isLive&&<div style={{fontSize:11,color:"#555",fontFamily:"DM Sans,sans-serif",textAlign:"center"}}>Your prediction is locked. Check back at full time.</div>}
          {!isFinished&&!isLive&&(
            <button onClick={()=>setLocked(false)} style={{width:"100%",marginTop:8,padding:"8px",background:"rgba(255,255,255,0.04)",border:"1px solid #333",borderRadius:8,color:"#888",fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:"0.08em"}}>
              &#9998; Change Prediction
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ManOfMatch - community vote at end of game */
function ManOfMatch({dayNum,selGame}){
  const[voted,setVoted]=useLS("motm_vote_"+dayNum,"");
  const[results,setResults]=useState(null);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
    if(!voted||!selGame)return;
    const key="motm_d"+dayNum+"_"+selGame.replace(/ /g,"_");
    sGet(key).then(r=>{if(r)setResults(r);});
  },[voted,selGame,dayNum]);
  if(!selGame)return null;
  const pts=selGame.split(" vs ").map(t=>t.trim());
  if(pts.length!==2)return null;

  // Get combined squad for both teams
  const teamA=SQUADS[pts[0]]||[];
  const teamB=SQUADS[pts[1]]||[];
  const combined=[...teamA.slice(0,5).map(p=>({name:p,team:pts[0]})),...teamB.slice(0,5).map(p=>({name:p,team:pts[1]}))];

  const vote=async(player)=>{
    setVoted(player.name);
    setLoading(true);
    const key="motm_d"+dayNum+"_"+selGame.replace(/ /g,"_");
    const existing=await sGet(key)||{};
    existing[player.name]=(existing[player.name]||0)+1;
    await sSet(key,existing);
    setResults(existing);
    setLoading(false);
  };

  const loadResults=async()=>{
    if(results)return;
    setLoading(true);
    const key="motm_d"+dayNum+"_"+selGame.replace(/ /g,"_");
    const r=await sGet(key)||{};
    setResults(r);
    setLoading(false);
  };

  const total=results?Object.values(results).reduce((a,b)=>a+b,0):0;
  const sorted=results?Object.entries(results).sort((a,b)=>b[1]-a[1]):[];

  return(
    <div style={{background:"rgba(241,91,181,0.07)",border:"1px solid rgba(241,91,181,0.25)",borderRadius:12,padding:14,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
        <span style={{fontSize:16}}>&#11088;</span>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#F15BB5",fontFamily:"DM Sans,sans-serif"}}>Man of the Match Vote</div>
      </div>
      {!voted?(
        <>
          <div style={{fontSize:11,color:"#666",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Who was the best player? Vote and see what the community thinks.</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {combined.map((p,i)=>(
              <button key={i} onClick={()=>vote(p)}
                style={{background:"rgba(255,255,255,0.04)",border:"1px solid #2A2A2A",borderRadius:8,padding:"8px 10px",cursor:"pointer",textAlign:"left",transition:"border-color 0.2s"}}>
                <div style={{fontSize:8,color:"#F15BB5",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"DM Sans,sans-serif",marginBottom:2}}>{p.team}</div>
                <div style={{fontSize:11,fontWeight:700,color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",lineHeight:1.3}}>{p.name}</div>
              </button>
            ))}
          </div>
        </>
      ):(
        <div>
          <div style={{fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif",marginBottom:10}}>
            You voted: <span style={{color:"#F5F5F5",fontWeight:700}}>{voted}</span>
          </div>
          {!results?(
            <button onClick={loadResults} style={{width:"100%",background:"rgba(241,91,181,0.12)",border:"1px solid rgba(241,91,181,0.3)",borderRadius:8,padding:"10px",color:"#F15BB5",fontFamily:"DM Sans,sans-serif",fontSize:12,fontWeight:700,cursor:"pointer"}}>
              {loading?"Loading...":"See Community Results"}
            </button>
          ):(
            <div>
              <div style={{fontSize:10,fontWeight:700,color:"#F15BB5",textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"DM Sans,sans-serif",marginBottom:8}}>{total} votes cast</div>
              {sorted.slice(0,5).map(([name,count],i)=>{
                const pct=total>0?Math.round((count/total)*100):0;
                return(
                  <div key={i} style={{marginBottom:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <div style={{fontSize:11,fontWeight:i===0?700:400,color:i===0?"#F5F5F5":"#888",fontFamily:"DM Sans,sans-serif"}}>{i===0?"🏆 ":""}{name}</div>
                      <div style={{fontSize:11,color:"#F15BB5",fontWeight:700,fontFamily:"DM Sans,sans-serif"}}>{pct}%</div>
                    </div>
                    <div style={{height:4,background:"#1A1A1A",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",background:i===0?"#F15BB5":"rgba(241,91,181,0.3)",width:pct+"%",borderRadius:2,transition:"width 0.5s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PlayerSpotlight({game,dayNum}){
  const players=React.useMemo(()=>getKeyPlayers(game,dayNum),[game,dayNum]);
  if(!game||!players||players.length===0)return null;
  return(
    <div style={{background:"rgba(155,93,229,0.08)",border:"1px solid rgba(155,93,229,0.25)",borderRadius:12,padding:14,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
        <span style={{fontSize:16}}>&#127919;</span>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"#9B5DE5",fontFamily:"DM Sans,sans-serif"}}>Key Players to Watch Today</div>
      </div>
      {players.map((p,i)=>(
        <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid #2A2A2A",borderRadius:10,padding:"10px 12px",marginBottom:i<players.length-1?8:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5,flexWrap:"wrap"}}>
            <div style={{background:"rgba(155,93,229,0.15)",border:"1px solid rgba(155,93,229,0.3)",borderRadius:6,padding:"2px 7px",fontSize:9,fontWeight:700,color:"#9B5DE5",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"DM Sans,sans-serif"}}>{p.team}</div>
            <div style={{fontSize:13,fontWeight:700,color:"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>{p.name}</div>
            <div style={{fontSize:10,color:"#555",fontFamily:"DM Sans,sans-serif"}}>- {p.pos}</div>
          </div>
          <div style={{fontSize:12,color:"#888",lineHeight:1.55,fontFamily:"DM Sans,sans-serif"}}>{p.why}</div>
        </div>
      ))}
    </div>
  );
}


/* Tactical Word of the Day - 34 terms mapped to each game day */
const TACTICAL_WORDS={
  1:{word:"Pressing Trap",def:"When a team deliberately lets the opponent have the ball in a certain area, then presses hard to win it back. Watch how Mexico tries to force South Africa into mistakes by pressing in specific zones."},
  2:{word:"False 9",def:"A striker who drops deep into midfield instead of staying up front, pulling defenders out of position. Watch how USA uses Pulisic in this role against Paraguay."},
  3:{word:"High Defensive Line",def:"When a team's back four push high up the pitch, playing the offside trap and compressing space. Watch how Brazil's defenders position themselves against Morocco."},
  4:{word:"Overload",def:"When one team gets more players on one side of the pitch than the other team can defend. Count how many times Germany overloads the right side against Curacao."},
  5:{word:"Set Piece Routine",def:"A pre-planned move from a corner or free kick. Watch the runs and blocks Spain's players make on every set piece against Cape Verde - nothing is accidental."},
  6:{word:"Half Space",def:"The area between the center and the wide channels - the most dangerous attacking zone. Watch how France's attackers drift into the half spaces against Senegal."},
  7:{word:"Cover Shadow",def:"When a defender positions themselves to block a passing lane while also watching their man. Watch how England's midfielders use their body shape to cut off Croatia's passing options."},
  8:{word:"Gegenpressing",def:"Immediately pressing the opponent right after losing the ball to win it back before they can organize. Watch how Canada reacts in the 5 seconds after losing possession."},
  9:{word:"Third Man Run",def:"When Player A passes to Player B, and Player C makes a run knowing the ball will come to them next. Watch for this in USA's build-up play."},
  10:{word:"Defensive Block",def:"When a team sits in a compact shape with two banks of four, making it hard to play through them. Watch how Netherlands organizes when they're defending."},
  11:{word:"Wide Overload",def:"Getting 3 or more players down one flank to outnumber defenders. Watch Spain's fullback and winger combinations on the right side."},
  12:{word:"Pressing Triggers",def:"Specific moments that signal to the whole team to press together - a back pass, a poor touch, a goalkeeper receiving the ball. Watch when France starts pressing and what triggers it."},
  13:{word:"Underlap",def:"When a fullback runs inside and through the center rather than overlapping outside. Watch England's fullbacks in this match."},
  14:{word:"Compactness",def:"How close together a team's defensive shape is. A compact team is hard to play through. Watch how tight Switzerland's midfield and defensive line stay."},
  15:{word:"Transition",def:"The moment a team goes from defending to attacking or vice versa. Watch how fast USA turns defense into attack after winning the ball."},
  16:{word:"Dropping Deep",def:"When an attacking player comes back toward their own goal to receive the ball. Watch how France's forwards do this to pull defenders out of position."},
  17:{word:"Wing Back",def:"A fullback who pushes very high and acts like a winger in attack but must track back in defense. Watch England's fullbacks in both phases."},
  18:{word:"Pressing Shape",def:"The formation a team uses when they don't have the ball. Watch how the winning teams in the Round of 32 press - as a unit, not individually."},
  19:{word:"Build-up Play",def:"How a team moves the ball from goalkeeper to attack, playing through pressure. Watch how teams play out from the back."},
  20:{word:"Positional Play",def:"Occupying specific positions on the pitch to create and use space - Pep Guardiola's philosophy. Watch how teams spread out to stretch the opponent."},
  21:{word:"Counter Press",def:"Pressing immediately after losing the ball to win it back quickly before the opponent can counter-attack. Watch the first 5 seconds after each turnover."},
  22:{word:"Diagonal Ball",def:"A long pass that switches play from one side to the other, finding players in space. Watch how teams use this to escape press and switch the point of attack."},
  23:{word:"Inverted Winger",def:"A winger who plays on the opposite side to their strong foot - cutting inside to shoot rather than crossing. Watch how teams use this in Round of 32."},
  24:{word:"Defensive Transition",def:"How a team organizes when they lose the ball - getting behind the ball quickly. Watch R16 teams' immediate reaction to losing possession."},
  25:{word:"Pressing Intensity",def:"How hard and how high a team presses. High intensity means pressing near the opponent's goal. Watch which R16 teams press highest up the pitch."},
  26:{word:"One-Two",def:"A quick pass and return pass that beats a defender using the wall. Count one-twos in midfield during R16 matches."},
  27:{word:"Space Between Lines",def:"The gap between a team's midfield and defensive line where attackers love to receive. Watch how teams protect or exploit this space."},
  28:{word:"Pressing Resistance",def:"How well a team keeps the ball and plays out under pressure. Watch how QF teams handle the opponent's press."},
  29:{word:"Set Piece Defending",def:"How a team defends corners and free kicks - zonal marking, man marking, or mixed. Watch how QF teams set up defensively on set pieces."},
  30:{word:"High Block vs Low Block",def:"A high block presses the opponent near their goal. A low block defends near your own goal. Watch which approach QF teams use and why."},
  31:{word:"Counter-Attack",def:"Hitting the opponent fast on the break after winning the ball. Watch how SF teams use space left by the opponent when they attack."},
  32:{word:"Box-to-Box",def:"A midfielder who contributes defensively and offensively - covering the whole pitch. Identify the box-to-box player in each SF team."},
  33:{word:"Defensive Shape",def:"The organized formation a team holds when defending. In the Third Place match watch which team holds their shape better when tired."},
  34:{word:"Total Football",def:"A system where every outfield player can play in any position - the highest expression of positional soccer. In the Final watch which team comes closest to this ideal."},
};

/* Badge system based on streak */
const STREAK_BADGES=[
  {days:3,id:"analyst",label:"3-Day Analyst",icon:"&#128203;",color:"#00AEEF"},
  {days:7,id:"scout",label:"Week 1 Scout",icon:"&#128269;",color:"#9B5DE5"},
  {days:14,id:"coach",label:"Fortnight Coach",icon:"&#128736;",color:"#FF6400"},
  {days:21,id:"expert",label:"3-Week Expert",icon:"&#127941;",color:"#E8FF00"},
  {days:34,id:"master",label:"World Cup Master",icon:"&#127775;",color:"#FFD700"},
];

const getEarnedBadges=(streak)=>STREAK_BADGES.filter(b=>streak>=b.days);
const getNextBadge=(streak)=>STREAK_BADGES.find(b=>streak<b.days)||null;

const SQUADS={
  "Mexico":["Santiago Gimenez","Raul Jimenez","Efrain Alvarez","Obed Vargas","Edson Alvarez","Guillermo Ochoa","Cesar Huerta","Roberto Alvarado","Luis Chavez","Jorge Sanchez","Hirving Lozano"],
  "South Africa":["Ronwen Williams","Ramahlwe Mphahlele","Siyanda Xulu","Thibang Phete","Terrence Mashego","Ethan Brooks","Bathusi Aubaas","Teboho Mokoena","Themba Zwane","Percy Tau","Evidence Makgopa"],
  "South Korea":["Son Heung-min","Kim Min-jae","Lee Kang-in","Hwang Hee-chan","Kim Seung-Gyu","Jo Hyeon-woo","Lee Jae-sung","Hwang In-beom","Cho Gue-sung","Yang Hyun-jun","Bae Jun-ho"],
  "Czechia":["Tomas Soucek","Patrik Schick","Ladislav Krejci","Jiri Pavlenka","Vladimir Coufal","Alex Kral","Ondrej Kolar"],
  "Canada":["Alphonso Davies","Jonathan David","Milan Borjan","Tajon Buchanan","Stephen Eustaquio","Liam Millar","Alistair Johnston","Kamal Miller"],
  "Bosnia & Herz.":["Edin Dzeko","Nikola Vasilj","Sead Kolasinac","Ermedin Demirovic","Benjamin Tahirovic","Amir Hadziahmetovic","Haris Tabakovic"],
  "Switzerland":["Granit Xhaka","Gregor Kobel","Breel Embolo","Manuel Akanji","Xherdan Shaqiri","Ruben Vargas","Noah Okafor","Remo Freuler","Zeki Amdouni","Dan Ndoye"],
  "Qatar":["Akram Afif","Almoez Ali","Meshaal Barsham","Assim Madibo","Bassam Al-Rawi","Boualem Khoukhi"],
  "Brazil":["Vinicius Jr","Neymar","Alisson","Ederson","Raphinha","Marquinhos","Casemiro","Bruno Guimaraes","Endrick","Gabriel Martinelli","Matheus Cunha","Gabriel Magalhaes"],
  "Morocco":["Achraf Hakimi","Yassine Bounou","Hakim Ziyech","Sofyan Amrabat","Romain Saiss","Noussair Mazraoui","Youssef En-Nesyri"],
  "Scotland":["Scott McTominay","Andy Robertson","Angus Gunn","Billy Gilmour","John McGinn","Kieran Tierney","Lawrence Shankland","Che Adams"],
  "Haiti":["Johny Placide","Duckens Nazon","Jean-Ricner Bellegarde","Frantzdy Pierrot","Wilson Isidor"],
  "USA":["Christian Pulisic","Matt Turner","Tyler Adams","Weston McKennie","Sergino Dest","Gio Reyna","Ricardo Pepi","Antonee Robinson","Chris Richards","Brenden Aaronson","Folarin Balogun","Tim Weah","Haji Wright","Malik Tillman","Miles Robinson","Chris Brady","Matt Freese"],
  "Paraguay":["Miguel Almiron","Oscar Romero","Antony Silva","Gustavo Gomez","Fabian Balbuena"],
  "Australia":["Mat Ryan","Mathew Leckie","Martin Boyle","Jackson Irvine","Harry Souttar","Milos Degenek","Ajdin Hrustic"],
  "Turkiye":["Hakan Calhanoglu","Arda Guler","Kenan Yildiz","Altay Bayindir","Merih Demiral","Zeki Celik","Ferdi Kadioglu"],
  "Germany":["Manuel Neuer","Joshua Kimmich","Jamal Musiala","Florian Wirtz","Kai Havertz","Antonio Rudiger","Leon Goretzka","Leroy Sane","Ilkay Gundogan","Oliver Baumann","Alexander Nubel","Jonathan Tah","Nico Schlotterbeck"],
  "Ecuador":["Moises Caicedo","Enner Valencia","Alexander Dominguez","Gonzalo Plata","Felix Torres","Piero Hincapie"],
  "Ivory Coast":["Amad Diallo","Franck Kessie","Yahia Fofana","Sebastien Haller","Nicolas Pepe","Simon Adingra","Seko Fofana","Ousmane Diomande","Odilon Kossounou","Elye Wahi"],
  "Curacao":["Eloy Room","Leandro Bacuna","Juninho Bacuna","Tahith Chong","Jurgen Locadia","Riechedly Bazoer"],
  "Netherlands":["Virgil van Dijk","Frenkie de Jong","Memphis Depay","Cody Gakpo","Denzel Dumfries","Nathan Ake","Davy Klaassen","Bart Verbruggen","Tijjani Reijnders","Donyell Malen","Ryan Gravenberch"],
  "Japan":["Zion Suzuki","Takehiro Tomiyasu","Wataru Endo","Ritsu Doan","Daichi Kamada","Takefusa Kubo","Ayase Ueda","Junya Ito","Kaoru Mitoma","Ko Itakura"],
  "Sweden":["Viktor Gyokeres","Jordan Larsson","Robin Olsen","Emil Krafth","Sebastian Larsson","Dejan Kulusevski","Emil Forsberg","Alexander Isak"],
  "Tunisia":["Wahbi Khazri","Aymen Dahmen","Ali Maaloul","Ellyes Skhiri","Hannibal Mejbri","Seifeddine Jaziri"],
  "Belgium":["Kevin De Bruyne","Romelu Lukaku","Thibaut Courtois","Axel Witsel","Jan Vertonghen","Yannick Carrasco","Dries Mertens","Timothy Castagne","Leandro Trossard","Arthur Vermeeren"],
  "Egypt":["Mohamed Salah","Mohamed Elneny","Gabaski","Ahmed Hegazi","Omar Marmoush","Hamdi Fathi","Ahmed Sayed Zizo"],
  "Iran":["Ali Beiranvand","Sardar Azmoun","Mehdi Taremi","Alireza Jahanbakhsh","Saman Ghoddos","Ashkan Dejagah"],
  "New Zealand":["Bill Tuiloma","Joe Bell","Liberato Cacace","Michael Boxall","Chris Wood","Max Mata"],
  "Spain":["David de Gea","Unai Simon","Pedri","Gavi","Ferran Torres","Alvaro Morata","Dani Carvajal","Rodri","Marco Asensio","Fabian Ruiz","Alejandro Balde","Aymeric Laporte","Dani Olmo","Mikel Oyarzabal","Yeremy Pino","Lamine Yamal"],
  "Cape Verde":["Ryan Mendes","Roberto Lopes","Jamiro Monteiro","Dylan Tavares","Diney","Kevin Pina"],
  "Saudi Arabia":["Mohammed Al-Owais","Saleh Al-Shehri","Salem Al-Dawsari","Ali Al-Bulayhi","Abdulelah Al-Malki","Firas Al-Buraikan"],
  "Uruguay":["Edinson Cavani","Luis Suarez","Fernando Muslera","Diego Godin","Federico Valverde","Rodrigo Bentancur","Darwin Nunez","Ronald Araujo","Jose Maria Gimenez"],
  "France":["Kylian Mbappe","Antoine Griezmann","Hugo Lloris","Mike Maignan","Raphael Varane","Benjamin Pavard","Aurelien Tchouameni","Eduardo Camavinga","Theo Hernandez","Marcus Thuram","Olivier Giroud","Jules Kounde","Dayot Upamecano","Adrien Rabiot"],
  "Senegal":["Sadio Mane","Edouard Mendy","Kalidou Koulibaly","Pape Matar Sarr","Nicolas Jackson","Ismaila Sarr","Iliman Ndiaye","Idrissa Gueye","Lamine Camara","Habib Diarra"],
  "Norway":["Erling Haaland","Martin Odegaard","Jorgen Strand Larsen","Orjan Nyland","Alexander Sorloth","Stefan Johansen","Veton Berisha"],
  "Iraq":["Aymen Hussein","Ali Adnan","Mohammed Hameed","Duvan Vergara"],
  "Argentina":["Lionel Messi","Emiliano Martinez","Angel Di Maria","Rodrigo De Paul","Julian Alvarez","Lautaro Martinez","Lisandro Martinez","Leandro Paredes","Enzo Fernandez","Nicolas Otamendi","Cristian Romero"],
  "Algeria":["Riyad Mahrez","Islam Slimani","Rais Mbolhi","Djamel Benlamri","Andy Delort","Ismail Bennacer","Sofiane Feghouli"],
  "Austria":["David Alaba","Marcel Sabitzer","Marko Arnautovic","Konrad Laimer","Christoph Baumgartner","Patrick Wimmer","Michael Gregoritsch"],
  "Jordan":["Mousa Tamari","Noor Al-Rawabdeh","Yazan Al-Naimat","Yazeed Abu Laila"],
  "Portugal":["Cristiano Ronaldo","Bruno Fernandes","Diogo Costa","Ruben Dias","Bernardo Silva","Joao Felix","Rafael Leao","Vitinha","Joao Cancelo","Pepe","Nuno Mendes","Pedro Neto"],
  "DR Congo":["Chancel Mbemba","Arthur Masuaku","Yoane Wissa","Silas Mvumpa","Cedric Bakambu"],
  "Uzbekistan":["Jasurbek Yakhshiboev","Jaloliddin Masharipov","Eldor Shomurodov","Otabek Shukurov"],
  "Colombia":["Luis Diaz","David Ospina","James Rodriguez","Falcao","Juan Cuadrado","Davinson Sanchez","Yerry Mina","Rafael Santos Borre","Duvan Zapata"],
  "England":["Harry Kane","Bukayo Saka","Jude Bellingham","Jordan Pickford","Declan Rice","Phil Foden","Marcus Rashford","Trent Alexander-Arnold","John Stones","Kyle Walker","Luke Shaw","Reece James","Anthony Gordon","Ollie Watkins","Ivan Toney","Noni Madueke"],
  "Croatia":["Luka Modric","Ivan Perisic","Dominik Livakovic","Mateo Kovacic","Josko Gvardiol","Marcelo Brozovic","Bruno Petkovic","Ante Rebic","Lovro Majer"],
  "Ghana":["Thomas Partey","Jordan Ayew","Andre Ayew","Lawrence Ati-Zigi","Daniel Amartey","Inaki Williams","Antoine Semenyo","Mohammed Kudus"],
  "Panama":["Roman Torres","Luis Tejada","Jaime Penedo","Gabriel Torres","Armando Cooper","Adalberto Carrasquilla","Anibal Godoy","Ismael Diaz"],
};

/* GK by team for goalkeeper prediction autocomplete */
const GOALKEEPERS={
  "Mexico":["Guillermo Ochoa","Rodolfo Cota","Carlos Acevedo"],
  "South Africa":["Ronwen Williams","Bruce Bvuma","Veli Mothwa"],
  "South Korea":["Kim Seung-Gyu","Jo Hyeon-woo","Song Bum-keun"],
  "Czechia":["Jiri Pavlenka","Tomas Vaclik","Ondrej Kolar"],
  "Canada":["Milan Borjan","Dayne St. Clair","James Pantemis"],
  "Bosnia & Herz.":["Nikola Vasilj","Martin Zlomislic","Osman Hadzikic"],
  "Switzerland":["Gregor Kobel","Marvin Keller","Yvon Mvogo"],
  "Qatar":["Meshaal Barsham","Salah Zakaria","Yousuf Hassan"],
  "Brazil":["Alisson","Ederson","Weverton"],
  "Morocco":["Yassine Bounou","Munir Mohamedi","Ahmed Tagnaouti"],
  "Scotland":["Angus Gunn","Craig Gordon","Liam Kelly"],
  "Haiti":["Johny Placide","Alexandre Pierre","Josue Duverger"],
  "USA":["Matt Turner","Chris Brady","Matt Freese"],
  "Paraguay":["Antony Silva","Rodrigo Munoz","Julio Cesar Fernandez"],
  "Australia":["Mat Ryan","Danny Vukovic","Tom Glover"],
  "Turkiye":["Altay Bayindir","Ugurcan Cakir","Mert Gunok"],
  "Germany":["Manuel Neuer","Oliver Baumann","Alexander Nubel"],
  "Ecuador":["Alexander Dominguez","Hernan Galindez","Wellington Ramirez"],
  "Ivory Coast":["Yahia Fofana","Alban Lafont","Mohamed Kone"],
  "Curacao":["Eloy Room","Trevor Doornbusch","Tyrick Bodak"],
  "Netherlands":["Bart Verbruggen","Mark Flekken","Justin Bijlow"],
  "Japan":["Zion Suzuki","Keisuke Osako","Tomoki Hayakawa"],
  "Sweden":["Robin Olsen","Karl-Johan Johnsson","Samuel Holm"],
  "Tunisia":["Aymen Dahmen","Bechir Ben Said","Moez Ben Cherifia"],
  "Belgium":["Thibaut Courtois","Koen Casteels","Matz Sels"],
  "Egypt":["Gabaski","Mohamed El-Shenawy","Mohamed Abu Gabal"],
  "Iran":["Ali Beiranvand","Amir Abedzadeh","Payam Niazmand"],
  "New Zealand":["Liberato Cacace","Michael Woud","Max Crocombe"],
  "Spain":["David de Gea","Unai Simon","Robert Sanchez"],
  "Cape Verde":["Diney","Kevin Pina","Elisson"],
  "Saudi Arabia":["Mohammed Al-Owais","Nawaf Al-Aqidi","Yasser Al-Mosailem"],
  "Uruguay":["Fernando Muslera","Sebastian Sosa","Sergio Rochet"],
  "France":["Hugo Lloris","Mike Maignan","Alphonse Areola"],
  "Senegal":["Edouard Mendy","Mory Diaw","Yehvann Diouf"],
  "Norway":["Orjan Nyland","Jorgen Strand Larsen","Eirik Horneland"],
  "Iraq":["Jalal Hassan","Mohammed Hameed","Saad Natiq"],
  "Argentina":["Emiliano Martinez","Geronimo Rulli","Juan Musso"],
  "Algeria":["Rais Mbolhi","Alexandre Oukidja","Amine Zerrouki"],
  "Austria":["Patrick Pentz","Alexander Schlager","Daniel Bachmann"],
  "Jordan":["Amer Shafi","Mohammad Abu Zema","Mahmoud Eid"],
  "Portugal":["Diogo Costa","Rui Patricio","Jose Sa"],
  "DR Congo":["Joris Delle","Ley Matampi","Joel Kiassumbua"],
  "Uzbekistan":["Eldorbek Sobirov","Jasur Yaxshiboev","Husan Bakaev"],
  "Colombia":["David Ospina","Camilo Vargas","Kevin Mier"],
  "England":["Jordan Pickford","Aaron Ramsdale","Dean Henderson"],
  "Croatia":["Dominik Livakovic","Ivica Ivusic","Nediljko Labrovic"],
  "Ghana":["Lawrence Ati-Zigi","Abdul Manaf Nurudeen","Richard Attah"],
  "Panama":["Orlando Mosquera","Luis Mejia","Cesar Samudio"],
};

/* PlayerInput - autocomplete input field */
// Pre-build the full all-teams candidate list once at module level
const ALL_PLAYERS=(()=>{const s=new Set();Object.values(SQUADS).forEach(arr=>arr.forEach(p=>s.add(p)));return[...s].sort();})();
const ALL_GKS=(()=>{const s=new Set();Object.values(GOALKEEPERS).forEach(arr=>arr.forEach(p=>s.add(p)));return[...s].sort();})();

function PlayerInput({value,onChange,placeholder,teams,gkOnly,dark}){
  const[show,setShow]=useState(false);
  const[activeIdx,setActiveIdx]=useState(-1);
  const ref=useRef(null);

  const candidates=useCallback(()=>{
    if(teams&&teams.length>0){
      const out=[];
      teams.forEach(team=>{
        const pool=gkOnly?(GOALKEEPERS[team]||[]):(SQUADS[team]||[]);
        pool.forEach(p=>{if(!out.includes(p))out.push(p);});
      });
      return out;
    }
    return gkOnly?ALL_GKS:ALL_PLAYERS;
  },[teams,gkOnly]);

  const filtered=value&&value.trim().length>0
    ? candidates().filter(p=>p.toLowerCase().includes(value.toLowerCase())).slice(0,7)
    : [];

  const select=name=>{onChange({target:{value:name}});setShow(false);setActiveIdx(-1);};

  useEffect(()=>{setActiveIdx(-1);},[value]);

  useEffect(()=>{
    const handler=e=>{if(ref.current&&!ref.current.contains(e.target))setShow(false);};
    document.addEventListener("mousedown",handler);
    return()=>document.removeEventListener("mousedown",handler);
  },[]);

  const handleKey=e=>{
    if(!show||filtered.length===0){return;}
    if(e.key==="ArrowDown"){e.preventDefault();setActiveIdx(i=>Math.min(i+1,filtered.length-1));}
    else if(e.key==="ArrowUp"){e.preventDefault();setActiveIdx(i=>Math.max(i-1,0));}
    else if(e.key==="Enter"&&activeIdx>=0){e.preventDefault();select(filtered[activeIdx]);}
    else if(e.key==="Escape"){setShow(false);setActiveIdx(-1);}
  };

  const inputStyle=dark?{
    width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid #444",borderRadius:8,
    padding:"8px 12px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:13,fontWeight:600,outline:"none"
  }:{
    width:"100%",background:"rgba(0,0,0,0.12)",border:"2px solid rgba(0,0,0,0.2)",borderRadius:8,
    padding:"5px 10px",color:"#000",fontFamily:"DM Sans,sans-serif",fontSize:13,fontWeight:600,outline:"none"
  };

  return(
    <div ref={ref} style={{position:"relative",flex:1}}>
      <input
        style={inputStyle}
        placeholder={placeholder}
        value={value||""}
        onChange={e=>{onChange(e);setShow(true);}}
        onFocus={()=>setShow(true)}
        onBlur={()=>setTimeout(()=>setShow(false),150)}
        onKeyDown={handleKey}
      />
      {show&&filtered.length>0&&(
        <div style={{position:"absolute",top:"calc(100% + 2px)",left:0,right:0,background:"#1E1E1E",border:"1px solid #3A3A3A",borderRadius:10,zIndex:300,maxHeight:200,overflowY:"auto",boxShadow:"0 8px 24px rgba(0,0,0,0.5)"}}>
          {filtered.map((p,i)=>(
            <div key={i} onMouseDown={()=>select(p)}
              style={{padding:"10px 14px",fontSize:13,fontWeight:600,color:"#F5F5F5",cursor:"pointer",borderBottom:i<filtered.length-1?"1px solid #2A2A2A":"none",fontFamily:"DM Sans,sans-serif",background:i===activeIdx?"#2A2A2A":"transparent"}}
              onMouseEnter={()=>setActiveIdx(i)}
              onMouseLeave={()=>{}}>
              {p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


const API_KEY=import.meta.env.VITE_API_KEY;
const WC_ID=2000;
const TEAM_MAP={"Korea Republic":"South Korea","Czech Republic":"Czechia","Bosnia and Herzegovina":"Bosnia & Herz.","United States":"USA","Turkey":"Turkiye","Cote d Ivoire":"Ivory Coast","Congo DR":"DR Congo","Democratic Republic of Congo":"DR Congo"};
const normName=n=>TEAM_MAP[n]||n;

const ROUND_UNLOCK={groups:new Date("2026-01-01T00:00:00"),r32:new Date("2026-06-28T00:00:00"),r16:new Date("2026-07-04T00:00:00"),qf:new Date("2026-07-09T00:00:00"),sf:new Date("2026-07-14T00:00:00"),final:new Date("2026-07-18T00:00:00")};
const ROUND_LOCK={groups:new Date("2026-06-11T13:00:00"),r32:new Date("2026-06-28T20:00:00"),r16:new Date("2026-07-04T20:00:00"),qf:new Date("2026-07-09T20:00:00"),sf:new Date("2026-07-14T20:00:00"),final:new Date("2026-07-18T20:00:00")};
const roundFuture=id=>new Date()<ROUND_UNLOCK[id];
const roundPast=id=>new Date()>=ROUND_LOCK[id];

const BAD_WORDS=["fuck","shit","bitch","bastard","dick","cock","pussy","cunt","nigger","nigga","faggot","retard","rape","asshole","whore","slut","prick","fag","dyke","spic","chink","kike","tranny","nazi","kill","murder","suicide","bomb","terrorist","porn","penis","vagina","wank","cum","drugs","cocaine","meth","heroin","dumbass","moron"];
const hasBad=t=>{if(!t)return false;const l=t.toLowerCase().replace(/[^a-z0-9\s]/g,"");return BAD_WORDS.some(w=>l.split(/\s+/).includes(w)||l.includes(w));};

async function sGet(k){try{if(!window.storage)return null;const r=await window.storage.get(k,true);return r?JSON.parse(r.value):null;}catch{return null;}}
async function sSet(k,v){try{if(!window.storage)return;await window.storage.set(k,JSON.stringify(v),true);}catch(e){console.warn(e);}}

function useLS(key,init){
  const[val,setVal]=useState(()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):(typeof init==="function"?init():init);}catch{return typeof init==="function"?init():init;}});
  const set=v=>{const n=typeof v==="function"?v(val):v;setVal(n);try{localStorage.setItem(key,JSON.stringify(n));}catch{}};
  return[val,set];
}

/* -- LIVE SCORES ------------------------------------------------- */
function useLiveScores(){
  const[matches,setMatches]=useState({});
  const[updated,setUpdated]=useState(null);
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState(null);
  const go=useCallback(async()=>{
    setLoading(true);
    try{
      const res=await fetch(`https://api.football-data.org/v4/competitions/${WC_ID}/matches`,{headers:{"X-Auth-Token":API_KEY}});
      if(!res.ok)throw new Error(res.status);
      const data=await res.json();
      const out={};
      (data.matches||[]).forEach(m=>{
        const h=normName(m.homeTeam?.name||"");
        const a=normName(m.awayTeam?.name||"");
        const obj={home:h,away:a,hs:m.score?.fullTime?.home??null,as:m.score?.fullTime?.away??null,status:m.status,min:m.minute||null};
        out[h+"_"+a]=obj;out[a+"_"+h]=obj;
      });
      setMatches(out);setUpdated(new Date());setErr(null);
    }catch(e){setErr(e.message);}
    finally{setLoading(false);}
  },[]);
  useEffect(()=>{
    const now=new Date();
    if(now<new Date("2026-06-11T00:00:00")||now>=new Date("2026-07-20T00:00:00"))return;
    go();
    const t=setInterval(go,5*60*1000);
    return()=>clearInterval(t);
  },[go]);
  const getScore=(h,a)=>matches[h+"_"+a]||matches[a+"_"+h]||null;
  return{getScore,updated,loading,err,refresh:go};
}

function StatusBadge({status,min}){
  if(!status||status==="SCHEDULED")return null;
  const map={LIVE:{l:"LIVE",bg:"#CC0000"},IN_PLAY:{l:min?min+"'":"LIVE",bg:"#CC0000"},PAUSED:{l:"HT",bg:"#E65100"},FINISHED:{l:"FT",bg:"#006633"}};
  const s=map[status]||{l:status,bg:"#333"};
  return <span style={{fontSize:9,fontWeight:700,padding:"2px 5px",borderRadius:3,background:s.bg,color:"#fff",fontFamily:"DM Sans,sans-serif"}}>{s.l}</span>;
}

function ScoreTag({score}){
  if(!score||score.hs===null)return <span style={{color:"#444",fontSize:11,fontFamily:"DM Sans,sans-serif"}}>vs</span>;
  const live=score.status==="LIVE"||score.status==="IN_PLAY";
  return <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:17,color:live?"#FF4B4B":score.status==="FINISHED"?"#E8FF00":"#F5F5F5",letterSpacing:"0.05em"}}>{score.hs} - {score.as}</span>;
}

/* -- HELPERS ----------------------------------------------------- */
const _dayHasSaveCache={};
const dayHasSave=d=>{
  if(_dayHasSaveCache[d]!==undefined)return _dayHasSaveCache[d];
  try{const s=localStorage.getItem("ws_day_"+d);const v=!!(s&&Object.keys(JSON.parse(s)).length>0);_dayHasSaveCache[d]=v;return v;}catch{_dayHasSaveCache[d]=false;return false;}
};
const invalidateDayCache=d=>{delete _dayHasSaveCache[d];};

const calcStreak=()=>{
  let s=0;
  const now=new Date();now.setHours(0,0,0,0);
  for(let d=34;d>=1;d--){
    const dd=new Date(DAY_DATES[d]+"T12:00:00");dd.setHours(0,0,0,0);
    if(dd>now)continue;
    if(dayHasSave(d))s++;
    else break;
  }
  return s;
};

const DEFAULT_PLAYERS=[{n:"1",x:50,y:88},{n:"2",x:15,y:72},{n:"5",x:38,y:74},{n:"6",x:62,y:74},{n:"3",x:85,y:72},{n:"8",x:20,y:54},{n:"4",x:50,y:50},{n:"11",x:80,y:54},{n:"7",x:18,y:32},{n:"9",x:50,y:28},{n:"10",x:82,y:32}];

function ThemeBadge({theme}){
  const c=THEME_COLORS[theme]||"#888";
  return <span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:20,textTransform:"uppercase",letterSpacing:"0.05em",background:c+"22",color:c,border:"1px solid "+c+"44",fontFamily:"DM Sans,sans-serif"}}>{theme}</span>;
}

/* -- CSS --------------------------------------------------------- */
/* styles live in App.css */

/* -- DRAGGABLE FIELD --------------------------------------------- */
function DraggableField({positions,setPositions}){
  const ref=useRef(null);const drag=useRef(null);
  const pos=e=>{const r=ref.current.getBoundingClientRect();const t=e.touches?.[0]||e;return{x:Math.min(97,Math.max(3,((t.clientX-r.left)/r.width)*100)),y:Math.min(97,Math.max(3,((t.clientY-r.top)/r.height)*100))};};
  const start=(e,i)=>{e.preventDefault();e.stopPropagation();drag.current=i;};
  const move=e=>{if(drag.current===null)return;e.preventDefault();const p=pos(e);setPositions(prev=>prev.map((pl,i)=>i===drag.current?{...pl,...p}:pl));};
  const end=()=>{drag.current=null;};
  return(
    <div ref={ref} style={{width:"100%",aspectRatio:"2/3",background:"#1A4A1A",borderRadius:10,border:"2px solid #2A6A2A",position:"relative",overflow:"hidden",touchAction:"none",userSelect:"none"}} onMouseMove={move} onMouseUp={end} onMouseLeave={end} onTouchMove={move} onTouchEnd={end}>
      <div style={{position:"absolute",top:"50%",left:"10%",right:"10%",height:1,background:"rgba(255,255,255,0.15)"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"30%",aspectRatio:"1",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.15)"}}/>
      <div style={{position:"absolute",top:0,left:"20%",right:"20%",height:"20%",border:"1px solid rgba(255,255,255,0.15)",borderTop:"none"}}/>
      <div style={{position:"absolute",bottom:0,left:"20%",right:"20%",height:"20%",border:"1px solid rgba(255,255,255,0.15)",borderBottom:"none"}}/>
      {positions.map((p,i)=>(
        <div key={i} style={{position:"absolute",left:p.x+"%",top:p.y+"%",transform:"translate(-50%,-50%)",width:26,height:26,background:"#E8FF00",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,cursor:"grab",boxShadow:"0 2px 6px rgba(0,0,0,0.6)",touchAction:"none"}} onMouseDown={e=>start(e,i)} onTouchStart={e=>start(e,i)}>
          <span style={{fontSize:10,fontFamily:"DM Sans,sans-serif",fontWeight:700,color:"#000",pointerEvents:"none"}}>{p.n}</span>
        </div>
      ))}
    </div>
  );
}

/* -- COMMUNITY COMPONENTS ---------------------------------------- */
function CommunityPanel({storageKey,myContent,myGame,color,locked,emptyMsg,shareLabel,viewLabel,contentDisplay}){
  const[entries,setEntries]=useState([]);
  const[count,setCount]=useState(0);
  const[open,setOpen]=useState(false);
  const[sub,setSub]=useLS("sub_"+storageKey,false);
  const[err,setErr]=useState("");
  const[sharing,setSharing]=useState(false);
  const hasContent=myContent&&myContent.trim().length>0;

  useEffect(()=>{
    // Load count on mount for button display
    sGet(storageKey).then(d=>{if(d){setCount(d.length);if(open)setEntries(d);}});
  },[open,storageKey]);

  const share=async()=>{
    if(!hasContent){setErr("Add your answer above first!");return;}
    if(hasBad(myContent)){setErr("Your response contains words that are not allowed.");return;}
    if(myContent.length>280){setErr("Please keep it under 280 characters.");return;}
    setSharing(true);
    const entry={content:myContent.trim().slice(0,280),game:myGame||"the match",ts:Date.now()};
    const existing=await sGet(storageKey)||[];
    const updated=[entry,...existing].slice(0,50);
    await sSet(storageKey,updated);
    setEntries(updated);setCount(updated.length);setSub(true);setErr("");setSharing(false);
  };

  if(locked)return null;

  if(!hasStorage())return(
    <div style={{marginTop:6,padding:"8px 12px",background:"rgba(255,75,75,0.06)",border:"1px solid rgba(255,75,75,0.2)",borderRadius:8}}>
      <div style={{fontSize:11,color:"#FF4B4B",fontFamily:"DM Sans,sans-serif",lineHeight:1.5}}>Community features require the full app at <span style={{fontWeight:700}}>spikedperformanceteam.com</span></div>
    </div>
  );

  if(!open){
    // No answer yet - show locked hint
    if(!hasContent)return(
      <div style={{marginTop:6,padding:"6px 10px",background:"rgba(255,255,255,0.02)",border:"1px solid #1A1A1A",borderRadius:8,fontSize:11,color:"#333",fontFamily:"DM Sans,sans-serif",textAlign:"center",fontStyle:"italic"}}>
        {emptyMsg}
      </div>
    );
    // Has answer but not posted yet - show a tappable POST button
    if(!sub)return(
      <button onClick={()=>setOpen(true)} style={{width:"100%",padding:"8px 10px",background:color+"12",border:"1px solid "+color+"35",borderRadius:8,color,fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer",marginTop:6,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
        &#128394; {shareLabel} to see what others said
      </button>
    );
    // Already posted - show view button with count
    return(
      <button onClick={()=>setOpen(true)} style={{width:"100%",padding:"7px",background:color+"0F",border:"1px solid "+color+"33",borderRadius:8,color,fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer",marginTop:6,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
        &#128065; {viewLabel}{count>0?" ("+count+")":""}
      </button>
    );
  }

  return(
    <div style={{marginTop:8,background:color+"0A",border:"1px solid "+color+"25",borderRadius:10,padding:"10px 12px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:11,fontWeight:700,color}}>Community Responses</span>
        <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:18,lineHeight:1,padding:"0 2px"}}>x</button>
      </div>
      {!sub?(
        <div style={{marginBottom:10,padding:"8px",background:"rgba(255,255,255,0.03)",borderRadius:8}}>
          <div style={{fontSize:10,color:"#555",marginBottom:6}}>Posting as: <span style={{color:"#F5F5F5",fontWeight:700}}>watching {myGame||"the match"}</span></div>
          <div style={{fontSize:11,color:"#888",marginBottom:6,fontStyle:"italic",lineHeight:1.4}}>{contentDisplay||myContent.slice(0,80)+(myContent.length>80?"...":"")}</div>
          {err&&<div style={{fontSize:10,color:"#FF4B4B",marginBottom:6,fontWeight:600}}>{err}</div>}
          <button onClick={share} disabled={sharing} style={{width:"100%",padding:"7px",background:color+"22",border:"1px solid "+color+"44",borderRadius:8,color,fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>{sharing?"Posting...":shareLabel}</button>
        </div>
      ):(
        <div style={{fontSize:10,color:"#888",marginBottom:8,padding:"5px 8px",background:"rgba(0,200,80,0.08)",borderRadius:6,fontWeight:600}}>&#10003; Your response is live</div>
      )}
      {entries.length===0?(
        <div style={{fontSize:11,color:"#444",textAlign:"center",padding:"10px"}}>No responses yet - be first!</div>
      ):(
        <div style={{maxHeight:220,overflowY:"auto"}}>
          {entries.map((e,i)=>(
            <div key={i} style={{padding:"8px 4px",borderBottom:i<entries.length-1?"1px solid rgba(255,255,255,0.05)":"none"}}>
              <div style={{fontSize:10,fontWeight:700,color,marginBottom:3}}>watching {e.game}</div>
              <div style={{fontSize:12,color:"#F5F5F5",lineHeight:1.5}}>{e.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const hasStorage=()=>typeof window!=="undefined"&&!!window.storage;

/* -- USERNAME PROMPT --------------------------------------------- */
function UsernamePrompt({onSet}){
  const[name,setName]=useState("");
  const submit=()=>{
    const trimmed=name.trim();
    if(!trimmed)return;
    try{localStorage.setItem("sst2026_username",JSON.stringify(trimmed));}catch{}
    onSet(trimmed);
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:16,padding:28,width:"100%",maxWidth:360,textAlign:"center"}}>
        <div style={{fontSize:36,marginBottom:12}}>&#9917;</div>
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:28,color:"#E8FF00",letterSpacing:"0.04em",marginBottom:6}}>Welcome to SST2026</div>
        <div style={{fontSize:13,color:"#888",fontFamily:"DM Sans,sans-serif",lineHeight:1.5,marginBottom:20}}>Set a display name so your teammates can find you on the leaderboard.</div>
        <input
          style={{width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid #444",borderRadius:10,padding:"12px 14px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:15,fontWeight:700,outline:"none",marginBottom:12,boxSizing:"border-box"}}
          placeholder="Your name or nickname..."
          value={name}
          onChange={e=>setName(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter")submit();}}
          autoFocus
          maxLength={24}
        />
        <button onClick={submit} disabled={!name.trim()} style={{width:"100%",padding:"13px",background:name.trim()?"#E8FF00":"#2A2A2A",color:name.trim()?"#000":"#555",border:"none",borderRadius:10,fontFamily:"DM Sans,sans-serif",fontSize:14,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.1em",cursor:name.trim()?"pointer":"not-allowed"}}>
          Let&#39;s Go &#127942;
        </button>
        <button onClick={()=>onSet("")} style={{marginTop:10,background:"none",border:"none",color:"#444",fontFamily:"DM Sans,sans-serif",fontSize:11,cursor:"pointer"}}>Skip for now</button>
      </div>
    </div>
  );
}

/* -- HOME SCREEN ------------------------------------------------- */
function HomeScreen({onGoToDay,getScore}){
  const today=new Date();today.setHours(0,0,0,0);
  let cur=null;
  Object.entries(DAY_DATES).forEach(([d,ds])=>{const dd=new Date(ds+"T12:00:00");if(dd.toDateString()===today.toDateString())cur=parseInt(d);});
  const done=DAYS.filter(d=>dayHasSave(d.day)).length;
  const[streak]=useState(calcStreak);

  return(
    <div>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#111 0%,#0A1A0A 100%)",padding:"36px 20px 24px",textAlign:"center",borderBottom:"1px solid #2A2A2A"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#E8FF00",textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:8,fontFamily:"DM Sans,sans-serif"}}>Spiked Performance Academy</div>
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:48,lineHeight:0.95,color:"#F5F5F5",letterSpacing:"0.02em"}}>SOCCER<br/><span style={{color:"#E8FF00"}}>SUMMER</span><br/>TOURNAMENT</div>
        <div style={{fontSize:12,color:"#888",marginTop:10,fontFamily:"DM Sans,sans-serif",lineHeight:1.5}}>34 game days. One worksheet each.<br/>June 11 - July 19, 2026.</div>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:16}}>
          {[["34","Game Days"],["48","Teams"],["6","Themes"]].map(([n,l])=>(
            <div key={l} style={{background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:12,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:26,color:"#E8FF00",lineHeight:1}}>{n}</div>
              <div style={{fontSize:9,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="scr">
        {/* Progress + Streak row */}
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1,background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:12,padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,fontWeight:700,color:"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>Progress</span>
              <span style={{fontSize:12,fontWeight:700,color:"#E8FF00",fontFamily:"DM Sans,sans-serif"}}>{done}/34</span>
            </div>
            <div style={{height:6,background:"#2A2A2A",borderRadius:3,marginTop:8,overflow:"hidden"}}>
              <div style={{height:"100%",background:"#E8FF00",borderRadius:3,width:((done/34)*100)+"%",transition:"width 0.5s ease"}}/>
            </div>
          </div>
          {streak>0&&(
            <div style={{background:"linear-gradient(135deg,#1A0800,#1A1A1A)",border:"1px solid rgba(255,100,0,0.4)",borderRadius:12,padding:"12px 14px",textAlign:"center",minWidth:80}}>
              <div className="streak-flame" style={{fontSize:22,lineHeight:1}}>&#128293;</div>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:22,color:"#FF6400",lineHeight:1,marginTop:2}}>{streak}</div>
              <div style={{fontSize:9,color:"#888",fontFamily:"DM Sans,sans-serif",fontWeight:600,textTransform:"uppercase"}}>Day Streak</div>
            </div>
          )}
        </div>

        {/* Streak Badges */}
        <StreakBadges streak={streak}/>

        {/* Today card */}
        {cur&&(
          <div onClick={()=>onGoToDay(cur)} style={{background:"linear-gradient(135deg,#1A1A00,#1A1A1A)",border:"1px solid rgba(232,255,0,0.3)",borderRadius:14,padding:"16px",marginBottom:12,cursor:"pointer"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#E8FF00",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,fontFamily:"DM Sans,sans-serif"}}>&#128197; Today</div>
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:40,color:"#F5F5F5",lineHeight:1}}>Day {cur}</div>
            <div style={{marginTop:6}}><ThemeBadge theme={DAYS[cur-1]?.theme}/></div>
            <div style={{fontSize:11,color:"#888",marginTop:6,fontFamily:"DM Sans,sans-serif"}}>{DAYS[cur-1]?.date}</div>
            {DAYS[cur-1]?.games.map((g,i)=>{
              const pts=g.split(" vs ");if(pts.length!==2)return null;
              const sc=getScore&&getScore(pts[0].trim(),pts[1].trim());
              return(
                <div key={i} style={{marginTop:5,display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:i>0?"1px solid rgba(232,255,0,0.1)":"none",paddingTop:i>0?5:0}}>
                  <span style={{fontSize:11,color:"#F5F5F5",fontWeight:600,fontFamily:"DM Sans,sans-serif",flex:1}}>{pts[0].trim()}</span>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><ScoreTag score={sc}/>{sc&&<StatusBadge status={sc.status} min={sc.min}/>}</div>
                  <span style={{fontSize:11,color:"#F5F5F5",fontWeight:600,fontFamily:"DM Sans,sans-serif",flex:1,textAlign:"right"}}>{pts[1].trim()}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* All days */}
        <div style={{fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>All 34 Days</div>
        {DAYS.map(d=>{
          const saved=dayHasSave(d.day);
          return(
            <div key={d.day} onClick={()=>onGoToDay(d.day)} style={{background:"#1A1A1A",border:"1px solid "+(saved?"rgba(232,255,0,0.2)":"#2A2A2A"),borderRadius:14,marginBottom:8,cursor:"pointer"}}>
              <div style={{padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:30,color:"#E8FF00",lineHeight:1,minWidth:44}}>{String(d.day).padStart(2,"0")}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:"#888",fontFamily:"DM Sans,sans-serif",fontWeight:600,textTransform:"uppercase"}}>{d.date}</div>
                  <div style={{marginTop:3}}><ThemeBadge theme={d.theme}/></div>
                </div>
                {saved&&<div style={{width:20,height:20,background:"rgba(0,200,80,0.15)",border:"1px solid rgba(0,200,80,0.4)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#00C850"}}>&#10003;</div>}
                <div style={{color:"#444",fontSize:18}}>&#8250;</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -- WORKSHEET SCREEN -------------------------------------------- */
function WorksheetScreen({dayNum,onBack,getScore}){
  const day=DAYS[dayNum-1];
  const qs=THEME_QS[day.theme];
  const[answers,setAnswers]=useLS("ws_day_"+dayNum,{});
  const[scoreH,setScoreH]=useLS("ws_sh_"+dayNum,"");
  const[scoreA,setScoreA]=useLS("ws_sa_"+dayNum,"");
  const[bestP,setBestP]=useLS("ws_bp_"+dayNum,"");
  const[selGame,setSelGame]=useLS("ws_game_"+dayNum,"");
  const[players,setPlayers]=useLS("ws_pl_"+dayNum,DEFAULT_PLAYERS);
  const[saved,setSaved]=useState(false);
  const saveTimer=useRef(null);
  const color=THEME_COLORS[day.theme];

  const upd=(k,v)=>{setAnswers(a=>({...a,[k]:v}));if(saveTimer.current)clearTimeout(saveTimer.current);saveTimer.current=setTimeout(()=>{setSaved(true);setTimeout(()=>setSaved(false),1500);},500);};
  const resetPl=()=>setPlayers([...DEFAULT_PLAYERS]);

  const sections=[
    {id:"pre",label:"Pre-Match",color:"#00AEEF",qs:qs.prematch},
    {id:"half",label:"Halftime",color:"#E8FF00",qs:qs.halftime},
    {id:"post",label:"End of Game",color,qs:qs.postmatch},
  ];

  return(
    <div>
      <div className="hdr">
        <button onClick={onBack} style={{background:"none",border:"none",color:"#888",fontSize:13,cursor:"pointer",marginBottom:8,padding:0,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>&#8592; Back</button>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:38,color:"#E8FF00",lineHeight:1}}>{String(dayNum).padStart(2,"0")}</div>
          <div><div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:18,letterSpacing:"0.05em"}}>{day.date}</div><ThemeBadge theme={day.theme}/></div>
        </div>
      </div>
      <div className="scr">
        <div style={{opacity:saved?1:0,fontSize:11,color:"#E8FF00",textAlign:"right",marginBottom:4,transition:"opacity 0.3s",fontFamily:"DM Sans,sans-serif"}}>&#10003; Saved</div>

        {/* Tactical Word of the Day */}
        <TacticalWord dayNum={dayNum}/>

        {/* Game picker */}
        <div className="card">
          <div style={{fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Today&#39;s Games - Tap the game you&#39;re watching</div>
          {day.games.map((g,i)=>{
            const pts=g.split(" vs ");const isM=pts.length===2;const isSel=selGame===g;
            return(
              <div key={i} style={{borderTop:i>0?"1px solid #2A2A2A":"none",paddingTop:i>0?8:0,marginBottom:8}}>
                {isM?(
                  <button onClick={()=>{setSelGame(g);upd("game",g);}} style={{width:"100%",padding:"10px 12px",borderRadius:12,border:"2px solid "+(isSel?"#E8FF00":"#2A2A2A"),background:isSel?"rgba(232,255,0,0.08)":"rgba(255,255,255,0.02)",cursor:"pointer",textAlign:"left"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
                        <span style={{fontSize:12,fontWeight:700,color:isSel?"#E8FF00":"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>{pts[0].trim()}</span>
                        {(()=>{const sc=getScore&&getScore(pts[0].trim(),pts[1].trim());return sc?(<div style={{display:"flex",alignItems:"center",gap:4}}><ScoreTag score={sc}/><StatusBadge status={sc.status} min={sc.min}/></div>):(<span style={{color:"#555",fontWeight:700,fontSize:11,fontFamily:"DM Sans,sans-serif"}}>vs</span>);})()}
                        <span style={{fontSize:12,fontWeight:700,color:isSel?"#E8FF00":"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>{pts[1].trim()}</span>
                      </div>
                      {isSel&&<span style={{fontSize:10,fontWeight:700,color:"#E8FF00",fontFamily:"DM Sans,sans-serif",background:"rgba(232,255,0,0.12)",padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap"}}>Watching</span>}
                    </div>
                  </button>
                ):<div style={{fontSize:13,color:"#F5F5F5",fontWeight:500,fontFamily:"DM Sans,sans-serif",padding:"8px 0"}}>{g}</div>}
              </div>
            );
          })}
          {!selGame&&<div style={{marginTop:4,fontSize:11,color:"#444",fontStyle:"italic",fontFamily:"DM Sans,sans-serif"}}>Tap a game to select which one you&#39;re watching</div>}
        </div>

        {/* Key Players Spotlight */}
        {selGame&&<PlayerSpotlight game={selGame} dayNum={dayNum}/>}

        {/* Pre-Match Score Prediction */}
        <PreMatchPredict dayNum={dayNum} selGame={selGame} getScore={getScore}/>

        {/* Question sections */}
        {sections.map(sec=>(
          <div key={sec.id} style={{background:sec.color+"0D",border:"1px solid "+sec.color+"33",borderRadius:12,padding:"14px",marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12,color:sec.color,fontFamily:"DM Sans,sans-serif"}}>{sec.label}</div>
            {sec.qs.map((q,qi)=>(
              <div key={qi} style={{marginBottom:16}}>
                <div style={{fontSize:13,color:"#F5F5F5",lineHeight:1.5,marginBottom:8,fontWeight:500,fontFamily:"DM Sans,sans-serif"}}>{qi+1}. {q}</div>
                <textarea placeholder="Write your answer here..." value={answers[sec.id+"_"+qi]||""} onChange={e=>upd(sec.id+"_"+qi,e.target.value)}/>
                <CommunityPanel
                  storageKey={"comm_d"+dayNum+"_"+sec.id+"_"+qi}
                  myContent={answers[sec.id+"_"+qi]||""}
                  myGame={selGame}
                  color="#00AEEF"
                  locked={false}
                  emptyMsg="Write your answer above to unlock community responses"
                  shareLabel="Post My Answer"
                  viewLabel="View community responses"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Formation */}
        <div style={{background:"#0A1A0A",border:"1px solid #2A6A2A",borderRadius:12,padding:"14px",marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:"#4CAF50",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8,fontFamily:"DM Sans,sans-serif"}}>Halftime Formation Challenge</div>
          <div style={{fontSize:12,color:"#888",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Drag the numbered players into position on the field</div>
          <DraggableField positions={players} setPositions={setPlayers}/>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",textAlign:"center",marginTop:6,fontFamily:"DM Sans,sans-serif"}}>Hold and drag any player dot to move them</div>
          <div style={{display:"flex",gap:10,alignItems:"center",marginTop:10}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10,fontWeight:700,color:"#4CAF50",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5,fontFamily:"DM Sans,sans-serif"}}>Formation</div>
              <input style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid #2A6A2A",borderRadius:10,padding:"9px 12px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:14,fontWeight:700,outline:"none"}} placeholder="e.g. 4-3-3" value={answers.formation||""} onChange={e=>upd("formation",e.target.value)}/>
            </div>
            <button onClick={resetPl} style={{padding:"9px 14px",background:"rgba(255,75,75,0.1)",border:"1px solid rgba(255,75,75,0.3)",borderRadius:10,color:"#FF4B4B",fontFamily:"DM Sans,sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",marginTop:18,whiteSpace:"nowrap"}}>Reset</button>
          </div>
          <CommunityPanel
            storageKey={"comm_formation_d"+dayNum}
            myContent={answers.formation||""}
            myGame={selGame}
            color="#4CAF50"
            locked={false}
            emptyMsg="Enter your formation above to unlock community formations"
            shareLabel="Post My Formation"
            viewLabel="View community formations"
            contentDisplay={answers.formation?("Formation: "+answers.formation):undefined}
          />
        </div>

        {/* Final score */}
        <div style={{background:"#E8FF00",borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:"#000",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"DM Sans,sans-serif"}}>Final Score</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
              <input style={{width:40,height:34,background:"rgba(0,0,0,0.12)",border:"2px solid rgba(0,0,0,0.2)",borderRadius:8,color:"#000",fontFamily:"Bebas Neue,sans-serif",fontSize:20,textAlign:"center"}} maxLength={2} value={scoreH} onChange={e=>setScoreH(e.target.value)} placeholder="0"/>
              <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:18,color:"#000"}}>-</span>
              <input style={{width:40,height:34,background:"rgba(0,0,0,0.12)",border:"2px solid rgba(0,0,0,0.2)",borderRadius:8,color:"#000",fontFamily:"Bebas Neue,sans-serif",fontSize:20,textAlign:"center"}} maxLength={2} value={scoreA} onChange={e=>setScoreA(e.target.value)} placeholder="0"/>
            </div>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:"#000",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"DM Sans,sans-serif"}}>Best Player</div>
            <PlayerInput value={bestP} onChange={e=>setBestP(e.target.value)} placeholder={selGame?"Start typing a player name...":"Pick a game above first"} teams={selGame?selGame.split(" vs ").map(t=>t.trim()):[]} gkOnly={false} dark={false}/>
          </div>
        </div>
        {/* Man of the Match Community Vote */}
        <ManOfMatch dayNum={dayNum} selGame={selGame}/>
      </div>

    </div>
  );
}

/* -- GROUPS SCREEN ----------------------------------------------- */
function GroupsScreen({getScore}){
  const[sel,setSel]=useState(null);
  const[scores,setScores]=useLS("group_scores",{});
  const setScore=(g,i,s,v)=>setScores(sc=>({...sc,[g+"_"+i+"_"+s]:v}));
  const getMatches=g=>{const t=GROUPS[g].teams;return[[t[0],t[1]],[t[2],t[3]],[t[0],t[2]],[t[1],t[3]],[t[0],t[3]],[t[1],t[2]]];};
  const calcStandings=g=>{
    const matches=getMatches(g);const stats={};
    GROUPS[g].teams.forEach(t=>{stats[t]={gp:0,w:0,d:0,l:0,gf:0,ga:0,pts:0};});
    matches.forEach(([h,a],i)=>{
      let hs=scores[g+"_"+i+"_h"];let as_=scores[g+"_"+i+"_a"];
      if((hs===undefined||hs==="")&&getScore){const sc=getScore(h,a);if(sc&&sc.hs!==null){hs=String(sc.hs);as_=String(sc.as);}}
      const hsi=parseInt(hs);const asi=parseInt(as_);
      if(isNaN(hsi)||isNaN(asi))return;
      stats[h].gp++;stats[h].gf+=hsi;stats[h].ga+=asi;
      stats[a].gp++;stats[a].gf+=asi;stats[a].ga+=hsi;
      if(hsi>asi){stats[h].w++;stats[h].pts+=3;stats[a].l++;}
      else if(hsi<asi){stats[a].w++;stats[a].pts+=3;stats[h].l++;}
      else{stats[h].d++;stats[h].pts++;stats[a].d++;stats[a].pts++;}
    });
    return Object.entries(stats).sort((a,b)=>b[1].pts-a[1].pts||(b[1].gf-b[1].ga)-(a[1].gf-a[1].ga)||b[1].gf-a[1].gf);
  };

  if(sel){
    const g=sel;const matches=getMatches(g);const standings=calcStandings(g);
    return(
      <div>
        <div className="hdr">
          <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:"#888",fontSize:13,cursor:"pointer",marginBottom:8,padding:0,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>&#8592; All Groups</button>
          <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:32,color:"#E8FF00"}}>Group {g}</div>
          <div style={{fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif"}}>{GROUPS[g].teams.join(" - ")}</div>
        </div>
        <div className="scr">
          <div style={{fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Match Results</div>
          {matches.map(([h,a],i)=>{
            const sc=getScore&&getScore(h,a);
            const hVal=scores[g+"_"+i+"_h"]||(sc&&sc.hs!==null?String(sc.hs):"");
            const aVal=scores[g+"_"+i+"_a"]||(sc&&sc.as!==null?String(sc.as):"");
            return(
              <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                <div style={{fontSize:12,fontWeight:600,color:"#F5F5F5",marginBottom:8,fontFamily:"DM Sans,sans-serif",display:"flex",alignItems:"center",gap:6}}>{h} vs {a}{sc&&<StatusBadge status={sc.status} min={sc.min}/>}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{flex:1,fontSize:12,fontWeight:600,color:"#F5F5F5",textAlign:"right",fontFamily:"DM Sans,sans-serif"}}>{h}</div>
                  <input style={{width:36,height:36,background:"rgba(255,255,255,0.08)",border:"2px solid "+(sc&&sc.hs!==null?"rgba(232,255,0,0.3)":"#2A2A2A"),borderRadius:8,color:sc&&sc.hs!==null?"#E8FF00":"#F5F5F5",fontFamily:"Bebas Neue,sans-serif",fontSize:18,textAlign:"center"}} maxLength={2} value={hVal} onChange={e=>setScore(g,i,"h",e.target.value)} placeholder="0"/>
                  <span style={{color:"#888",fontWeight:700,fontFamily:"DM Sans,sans-serif"}}>:</span>
                  <input style={{width:36,height:36,background:"rgba(255,255,255,0.08)",border:"2px solid "+(sc&&sc.as!==null?"rgba(232,255,0,0.3)":"#2A2A2A"),borderRadius:8,color:sc&&sc.as!==null?"#E8FF00":"#F5F5F5",fontFamily:"Bebas Neue,sans-serif",fontSize:18,textAlign:"center"}} maxLength={2} value={aVal} onChange={e=>setScore(g,i,"a",e.target.value)} placeholder="0"/>
                  <div style={{flex:1,fontSize:12,fontWeight:600,color:"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>{a}</div>
                </div>
              </div>
            );
          })}
          <div style={{fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",margin:"16px 0 8px",fontFamily:"DM Sans,sans-serif"}}>Standings</div>
          <div style={{background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:12,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr repeat(8,26px)",gap:2,padding:"6px 10px",background:"rgba(255,255,255,0.03)"}}>
              {["Team","GP","W","D","L","GF","GA","GD","PTS"].map((h,i)=>(
                <span key={h} style={{fontSize:9,fontWeight:700,color:"#888",textAlign:i===0?"left":"center",textTransform:"uppercase",fontFamily:"DM Sans,sans-serif"}}>{h}</span>
              ))}
            </div>
            {standings.map(([team,s],rank)=>(
              <div key={team} style={{display:"grid",gridTemplateColumns:"1fr repeat(8,26px)",gap:2,padding:"8px 10px",background:rank<2?"rgba(232,255,0,0.05)":"transparent",borderTop:"1px solid #2A2A2A"}}>
                <span style={{fontSize:11,fontWeight:600,color:rank<2?"#E8FF00":"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>{rank<2?"+ ":""}{team}</span>
                {[s.gp,s.w,s.d,s.l,s.gf,s.ga,(s.gf-s.ga>0?"+":"")+String(s.gf-s.ga)].map((v,i)=>(
                  <span key={i} style={{fontSize:11,color:"#888",textAlign:"center",fontFamily:"DM Sans,sans-serif"}}>{v}</span>
                ))}
                <span style={{fontSize:12,color:"#E8FF00",textAlign:"center",fontWeight:700,fontFamily:"DM Sans,sans-serif"}}>{s.pts}</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:10,color:"#555",marginTop:8,fontFamily:"DM Sans,sans-serif"}}>+ Top 2 teams advance. Live scores auto-fill when available.</div>
        </div>
      </div>
    );
  }

  return(
    <div>
      <div className="hdr">
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:26,color:"#E8FF00",letterSpacing:"0.05em"}}>Group Stage</div>
        <div style={{fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif"}}>All 12 groups - tap to enter scores</div>
      </div>
      <div className="scr">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {Object.entries(GROUPS).map(([g,data])=>(
            <div key={g} onClick={()=>setSel(g)} style={{background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:14,padding:"14px",cursor:"pointer"}}>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:34,color:"#E8FF00",lineHeight:1}}>Group {g}</div>
              <div style={{marginTop:6}}>{data.teams.map(t=><div key={t} style={{fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif",fontWeight:500,padding:"2px 0"}}>{t}</div>)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -- BRACKET SCREEN ---------------------------------------------- */
function BracketScreen(){
  const[bracket,setBracket]=useLS("bracket_v4",{});
  const[activeRound,setActiveRound]=useState("r32");
  const setWinner=(id,team)=>{setBracket(b=>{const n={...b,[id+"_winner"]:team};if(FEED_FORWARD[id]){const{next,side}=FEED_FORWARD[id];n[next+"_"+side]=team;}return n;});};
  const update=(id,side,val)=>setBracket(b=>({...b,[id+"_"+side]:val}));
  const isLabel=t=>!t||t.startsWith("Winner")||t.startsWith("Runner")||t.startsWith("3rd")||t.startsWith("W R")||t.startsWith("W Q")||t.startsWith("W S")||t.startsWith("SF")||t.startsWith("QF");

  const renderMatch=m=>{
    const home=bracket[m.id+"_home"]||m.home||"";
    const away=bracket[m.id+"_away"]||m.away||"";
    const winner=bracket[m.id+"_winner"]||"";
    const hR=home&&!isLabel(home);const aR=away&&!isLabel(away);const both=hR&&aR;
    return(
      <div key={m.id} style={{background:"#1A1A1A",border:"2px solid "+(winner?"rgba(232,255,0,0.3)":"#2A2A2A"),borderRadius:12,marginBottom:10,overflow:"hidden"}}>
        {(m.date||m.venue)&&<div style={{padding:"3px 12px",background:"rgba(255,255,255,0.03)",fontSize:9,color:"#444",fontFamily:"DM Sans,sans-serif",fontWeight:600,textTransform:"uppercase"}}>{m.date}{m.date&&m.venue?" - ":""}{m.venue}</div>}
        {/* Home row */}
        <div onClick={()=>both&&setWinner(m.id,home)} style={{padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #2A2A2A",cursor:both?"pointer":"default",background:winner&&winner===home?"rgba(232,255,0,0.08)":"transparent"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {winner===home&&<span style={{fontSize:14}}>&#127942;</span>}
            <span style={{fontSize:13,fontWeight:700,color:winner===home?"#E8FF00":hR?"#F5F5F5":"#333",fontFamily:"DM Sans,sans-serif"}}>{home||m.home||"TBD"}</span>
          </div>
          {both&&<div style={{width:18,height:18,borderRadius:"50%",border:"2px solid "+(winner===home?"#E8FF00":"#333"),background:winner===home?"#E8FF00":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{winner===home&&<span style={{fontSize:10,color:"#000",fontWeight:700}}>&#10003;</span>}</div>}
        </div>
        {/* Away row */}
        <div onClick={()=>both&&setWinner(m.id,away)} style={{padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:both?"pointer":"default",background:winner&&winner===away?"rgba(232,255,0,0.08)":"transparent"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {winner===away&&<span style={{fontSize:14}}>&#127942;</span>}
            <span style={{fontSize:13,fontWeight:700,color:winner===away?"#E8FF00":aR?"#F5F5F5":"#333",fontFamily:"DM Sans,sans-serif"}}>{away||m.away||"TBD"}</span>
          </div>
          {both&&<div style={{width:18,height:18,borderRadius:"50%",border:"2px solid "+(winner===away?"#E8FF00":"#333"),background:winner===away?"#E8FF00":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{winner===away&&<span style={{fontSize:10,color:"#000",fontWeight:700}}>&#10003;</span>}</div>}
        </div>
        {/* Edit inputs */}
        <div style={{padding:"7px 14px",background:"rgba(0,0,0,0.15)",display:"flex",gap:8}}>
          <input style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid #333",borderRadius:8,padding:"6px 10px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:12,fontWeight:600}} placeholder={m.home||"Team 1..."} value={bracket[m.id+"_home"]||""} onChange={e=>update(m.id,"home",e.target.value)}/>
          <input style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid #333",borderRadius:8,padding:"6px 10px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:12,fontWeight:600}} placeholder={m.away||"Team 2..."} value={bracket[m.id+"_away"]||""} onChange={e=>update(m.id,"away",e.target.value)}/>
        </div>
        {winner&&(
          <div style={{padding:"4px 14px",background:"rgba(232,255,0,0.05)",borderTop:"1px solid rgba(232,255,0,0.1)",fontSize:10,color:"#E8FF00",fontFamily:"DM Sans,sans-serif",fontWeight:700}}>
            &#10003; {winner} advances{FEED_FORWARD[m.id]?" - added to next round":""}
          </div>
        )}
        {/* Edit/clear winner */}
        {winner&&<button onClick={()=>setBracket(b=>{const n={...b};delete n[m.id+"_winner"];return n;})} style={{width:"100%",padding:"4px",background:"rgba(255,75,75,0.06)",border:"none",borderTop:"1px solid rgba(255,75,75,0.15)",color:"#FF4B4B",fontFamily:"DM Sans,sans-serif",fontSize:10,fontWeight:600,cursor:"pointer"}}>&#9998; Change result</button>}
      </div>
    );
  };

  const rounds=[{id:"r32",label:"Round of 32"},{id:"r16",label:"Round of 16"},{id:"qf",label:"Quarters"},{id:"sf",label:"Semis"},{id:"final",label:"Final"}];
  return(
    <div>
      <div className="hdr" style={{paddingBottom:0}}>
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:26,color:"#E8FF00",letterSpacing:"0.05em"}}>Bracket</div>
        <div style={{fontSize:11,color:"#888",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Winners auto-advance. Tap to pick, tap Change to edit.</div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:12,WebkitOverflowScrolling:"touch"}}>
          {rounds.map(r=>(
            <button key={r.id} onClick={()=>setActiveRound(r.id)} style={{padding:"7px 14px",borderRadius:20,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,flexShrink:0,background:activeRound===r.id?"#E8FF00":"#1A1A1A",color:activeRound===r.id?"#000":"#888"}}>{r.label}</button>
          ))}
        </div>
      </div>
      <div className="scr">
        {activeRound==="r32"&&(<>
          <div style={{background:"rgba(0,174,239,0.06)",border:"1px solid rgba(0,174,239,0.2)",borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif",lineHeight:1.5}}>
            <span style={{fontWeight:700,color:"#00AEEF"}}>How it works: </span>Enter team names in the boxes as the group stage ends June 27. Once both teams are entered tap the winner - they auto-advance. Made a mistake? Tap Change result.
          </div>
          <div style={{fontSize:10,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>16 Matches - Jun 28 to Jul 3</div>
          {R32_MATCHES.map(m=>renderMatch(m))}
        </>)}
        {activeRound==="r16"&&(<><div style={{fontSize:10,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>8 Matches - Jul 4 to 7</div>{R16_MATCHES.map(m=>renderMatch(m))}</>)}
        {activeRound==="qf"&&(<><div style={{fontSize:10,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>4 Matches - Jul 9 to 11</div>{QF_MATCHES.map(m=>renderMatch(m))}</>)}
        {activeRound==="sf"&&(<>
          <div style={{fontSize:10,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>2 Matches - Jul 14 and 15</div>
          {[{id:"sf_1",date:"Tue Jul 14",home:bracket["sf_1_home"]||"QF-1 winner",away:bracket["sf_1_away"]||"QF-2 winner",venue:"MetLife Stadium"},{id:"sf_2",date:"Wed Jul 15",home:bracket["sf_2_home"]||"QF-3 winner",away:bracket["sf_2_away"]||"QF-4 winner",venue:"AT&T Stadium Dallas"}].map(m=>renderMatch(m))}
        </>)}
        {activeRound==="final"&&(<>
          <div style={{fontSize:10,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Third Place - Sat Jul 18 - Hard Rock Stadium Miami</div>
          {renderMatch({id:"third",date:"Sat Jul 18",home:bracket["third_home"]||"SF-1 loser",away:bracket["third_away"]||"SF-2 loser",venue:"Hard Rock Stadium"})}
          <div style={{fontSize:10,fontWeight:700,color:"#E8FF00",textTransform:"uppercase",letterSpacing:"0.08em",margin:"18px 0 10px",fontFamily:"DM Sans,sans-serif"}}>&#127942; The Final - Sun Jul 19 - MetLife Stadium NJ</div>
          <div style={{background:"linear-gradient(135deg,#1A1A00,#1A1A1A)",border:"2px solid rgba(232,255,0,0.4)",borderRadius:16,overflow:"hidden"}}>
            {[{key:"home",label:bracket["final_match_home"]||"SF-1 winner"},{key:"away",label:bracket["final_match_away"]||"SF-2 winner"}].map(({key,label},i)=>(
              <div key={key} onClick={()=>{if(bracket["final_match_home"]&&bracket["final_match_away"])setWinner("final_match",label);}} style={{padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:i===0?"1px solid rgba(232,255,0,0.15)":"none",cursor:bracket["final_match_home"]&&bracket["final_match_away"]?"pointer":"default",background:bracket["final_match_winner"]===label?"rgba(232,255,0,0.1)":"transparent"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  {bracket["final_match_winner"]===label&&<span style={{fontSize:18}}>&#127942;</span>}
                  <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:22,color:bracket["final_match_winner"]===label?"#E8FF00":"#F5F5F5",letterSpacing:"0.03em"}}>{label}</span>
                </div>
                {bracket["final_match_home"]&&bracket["final_match_away"]&&<div style={{width:20,height:20,borderRadius:"50%",border:"2px solid "+(bracket["final_match_winner"]===label?"#E8FF00":"#444"),background:bracket["final_match_winner"]===label?"#E8FF00":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{bracket["final_match_winner"]===label&&<span style={{fontSize:11,color:"#000",fontWeight:700}}>&#10003;</span>}</div>}
              </div>
            ))}
            {(!bracket["final_match_home"]||!bracket["final_match_away"])&&(
              <div style={{padding:"10px 14px",display:"flex",gap:8}}>
                <input style={{flex:1,background:"rgba(232,255,0,0.05)",border:"1px solid rgba(232,255,0,0.2)",borderRadius:8,padding:"9px 12px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:13,fontWeight:600}} placeholder="Finalist 1..." value={bracket["final_match_home"]||""} onChange={e=>update("final_match","home",e.target.value)}/>
                <input style={{flex:1,background:"rgba(232,255,0,0.05)",border:"1px solid rgba(232,255,0,0.2)",borderRadius:8,padding:"9px 12px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:13,fontWeight:600}} placeholder="Finalist 2..." value={bracket["final_match_away"]||""} onChange={e=>update("final_match","away",e.target.value)}/>
              </div>
            )}
            {bracket["final_match_winner"]&&(
              <div style={{padding:"16px",textAlign:"center",borderTop:"1px solid rgba(232,255,0,0.15)"}}>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:34,color:"#E8FF00",letterSpacing:"0.05em"}}>World Cup Champion</div>
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:28,color:"#F5F5F5",letterSpacing:"0.03em"}}>{bracket["final_match_winner"]}</div>
              </div>
            )}
            {bracket["final_match_winner"]&&<button onClick={()=>setBracket(b=>{const n={...b};delete n["final_match_winner"];return n;})} style={{width:"100%",padding:"4px",background:"rgba(255,75,75,0.06)",border:"none",borderTop:"1px solid rgba(255,75,75,0.15)",color:"#FF4B4B",fontFamily:"DM Sans,sans-serif",fontSize:10,fontWeight:600,cursor:"pointer"}}>&#9998; Change result</button>}
          </div>
        </>)}
      </div>
    </div>
  );
}

/* -- SCORING HELPERS --------------------------------------------- */
const normTeam=s=>s.trim().toLowerCase();

const getActualGroupStandings=()=>{
  try{
    const scores=JSON.parse(localStorage.getItem("group_scores")||"{}");
    const result={};
    Object.entries(GROUPS).forEach(([g,data])=>{
      const teams=data.teams;
      const matches=[[teams[0],teams[1]],[teams[2],teams[3]],[teams[0],teams[2]],[teams[1],teams[3]],[teams[0],teams[3]],[teams[1],teams[2]]];
      const stats={};
      teams.forEach(t=>{stats[t]={gp:0,w:0,d:0,l:0,gf:0,ga:0,pts:0};});
      matches.forEach(([h,a],i)=>{
        const hs=scores[g+"_"+i+"_h"];const as_=scores[g+"_"+i+"_a"];
        const hsi=parseInt(hs);const asi=parseInt(as_);
        if(isNaN(hsi)||isNaN(asi))return;
        stats[h].gp++;stats[h].gf+=hsi;stats[h].ga+=asi;
        stats[a].gp++;stats[a].gf+=asi;stats[a].ga+=hsi;
        if(hsi>asi){stats[h].w++;stats[h].pts+=3;stats[a].l++;}
        else if(hsi<asi){stats[a].w++;stats[a].pts+=3;stats[h].l++;}
        else{stats[h].d++;stats[h].pts++;stats[a].d++;stats[a].pts++;}
      });
      result[g]=Object.entries(stats).sort((a,b)=>b[1].pts-a[1].pts||(b[1].gf-b[1].ga)-(a[1].gf-a[1].ga)||b[1].gf-a[1].gf).map(([t])=>t);
    });
    return result;
  }catch{return{};}
};

const calcScore=(preds,bracket,standings)=>{
  let pts=0;
  Object.keys(GROUPS).forEach(g=>{
    const actual=standings[g]||[];
    if(actual[0]&&preds["g"+g+"_1"]&&normTeam(preds["g"+g+"_1"])===normTeam(actual[0]))pts+=1;
    if(actual[1]&&preds["g"+g+"_2"]&&normTeam(preds["g"+g+"_2"])===normTeam(actual[1]))pts+=1;
  });
  for(let i=1;i<=16;i++){const a=bracket["r32_"+i+"_winner"];if(a&&preds["r32_w"+i]&&normTeam(preds["r32_w"+i])===normTeam(a))pts+=2;}
  for(let i=1;i<=8;i++){const a=bracket["r16_"+i+"_winner"];if(a&&preds["r16_w"+i]&&normTeam(preds["r16_w"+i])===normTeam(a))pts+=3;}
  for(let i=1;i<=4;i++){const a=bracket["qf_"+i+"_winner"];if(a&&preds["qf_w"+i]&&normTeam(preds["qf_w"+i])===normTeam(a))pts+=5;}
  for(let i=1;i<=2;i++){const a=bracket["sf_"+i+"_winner"];if(a&&preds["sf_w"+i]&&normTeam(preds["sf_w"+i])===normTeam(a))pts+=8;}
  const third=bracket["third_winner"];
  if(third&&preds["third"]&&normTeam(preds["third"])===normTeam(third))pts+=15;
  const champ=bracket["final_match_winner"];
  if(champ&&preds["champion"]&&normTeam(preds["champion"])===normTeam(champ))pts+=20;
  return pts;
};

/* -- PREDICTIONS SCREEN ------------------------------------------ */
function Block({id,label,icon,locks,lockRound,children}){
  const future=roundFuture(id);
  const locked=locks[id]||roundPast(id);
  if(future)return(
    <div style={{background:"#111",border:"1px solid #1A1A1A",borderRadius:14,padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:10,opacity:0.5}}>
      <span style={{fontSize:20}}>{icon}</span>
      <div style={{flex:1}}>
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:18,color:"#333",letterSpacing:"0.05em"}}>{label}</div>
        <div style={{fontSize:10,color:"#333",fontFamily:"DM Sans,sans-serif"}}>Unlocks {ROUND_UNLOCK[id].toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
      </div>
      <span style={{fontSize:20}}>&#128274;</span>
    </div>
  );
  return(
    <div style={{background:"#1A1A1A",border:"1px solid "+(locked?"rgba(232,255,0,0.2)":"#2A2A2A"),borderRadius:14,padding:"14px 16px",marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20}}>{icon}</span>
          <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:20,color:locked?"#E8FF00":"#F5F5F5",letterSpacing:"0.05em"}}>{label}</div>
        </div>
        {locked?<span style={{fontSize:10,fontWeight:700,color:"#E8FF00",background:"rgba(232,255,0,0.08)",border:"1px solid rgba(232,255,0,0.2)",borderRadius:20,padding:"3px 10px",fontFamily:"DM Sans,sans-serif"}}>&#128274; Locked</span>:
        <button onClick={()=>lockRound(id)} style={{padding:"5px 12px",borderRadius:20,border:"1px solid #E8FF00",background:"rgba(232,255,0,0.06)",color:"#E8FF00",fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>Lock &#10003;</button>}
      </div>
      {children(locked)}
    </div>
  );
}

function PredInput({value,onChange,locked,placeholder}){
  return <input style={{flex:1,background:locked?"rgba(232,255,0,0.03)":"rgba(255,255,255,0.05)",border:"1px solid "+(locked?"rgba(232,255,0,0.15)":"#2A2A2A"),borderRadius:10,padding:"9px 12px",color:locked?"#666":"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:13,width:"100%"}} placeholder={locked?"Locked":placeholder} value={value||""} onChange={onChange} readOnly={locked}/>;
}

function PredictionsScreen(){
  const[preds,setPreds]=useLS("preds_v4",{});
  const[locks,setLocks]=useLS("pred_locks_v4",{});
  const[activeTab,setActiveTab]=useState("picks");
  const[leaderboard,setLeaderboard]=useState([]);
  const[uid]=useLS("uid",()=>Math.random().toString(36).slice(2,10));
  const[myName]=useLS("sst2026_username","");
  const[myGroupCode,setMyGroupCode]=useLS("my_group_code","");
  const[myGroupName,setMyGroupName]=useLS("my_group_name","");
  const[groupLeaderboard,setGroupLeaderboard]=useState([]);
  const[groupInput,setGroupInput]=useState("");
  const[groupNameInput,setGroupNameInput]=useState("");
  const[groupError,setGroupError]=useState("");
  const[groupLoading,setGroupLoading]=useState(false);

  const genCode=()=>Math.random().toString(36).slice(2,8).toUpperCase();

  const createGroup=async()=>{
    if(!groupNameInput.trim()){setGroupError("Enter a group name first.");return;}
    setGroupLoading(true);
    let code=genCode();
    let attempts=0;
    while(attempts<10){
      const existing=await sGet("group_"+code);
      if(!existing)break;
      code=genCode();
      attempts++;
    }
    const groupData={name:groupNameInput.trim(),code,createdBy:uid,members:[uid],ts:Date.now()};
    await sSet("group_"+code,groupData);
    setMyGroupCode(code);setMyGroupName(groupNameInput.trim());setGroupError("");setGroupLoading(false);
  };

  const joinGroup=async()=>{
    const code=groupInput.trim().toUpperCase();
    if(code.length<4){setGroupError("Enter a valid group code.");return;}
    setGroupLoading(true);
    const groupData=await sGet("group_"+code);
    if(!groupData){setGroupError("Group not found. Check the code and try again.");setGroupLoading(false);return;}
    if(!groupData.members.includes(uid)){
      groupData.members=[...groupData.members,uid];
      await sSet("group_"+code,groupData);
    }
    setMyGroupCode(code);setMyGroupName(groupData.name);setGroupError("");setGroupInput("");setGroupLoading(false);
  };

  const leaveGroup=()=>{
    if(!window.confirm("Leave this group?"))return;
    setMyGroupCode("");setMyGroupName("");
  };

  const loadGroupLeaderboard=useCallback(async()=>{
    if(!myGroupCode)return;
    const groupData=await sGet("group_"+myGroupCode);
    if(!groupData)return;
    const allEntries=await sGet("lb_v4")||[];
    const memberEntries=allEntries.filter(e=>groupData.members.includes(e.uid));
    const byUid={};
    memberEntries.forEach(e=>{
      if(!byUid[e.uid]||e.ts>byUid[e.uid].ts)byUid[e.uid]=e;
    });
    const bracket=JSON.parse(localStorage.getItem("bracket_v4")||"{}");
    const standings=getActualGroupStandings();
    const scored=Object.values(byUid).map(e=>({...e,pts:calcScore(e.preds||{},bracket,standings)}));
    scored.sort((a,b)=>b.pts-a.pts);
    setGroupLeaderboard(scored);
  },[myGroupCode]);

  const upd=(k,v,round)=>{if(locks[round]||roundPast(round))return;setPreds(p=>({...p,[k]:v}));};
  const lockRound=async round=>{
    if(!window.confirm("Lock your "+round+" predictions? This cannot be undone."))return;
    setLocks(l=>({...l,[round]:true}));
    const entry={uid,round,preds,name:myName||("Fan #"+uid.slice(0,6).toUpperCase()),ts:Date.now()};
    const existing=await sGet("lb_v4")||[];
    const filtered=existing.filter(e=>!(e.uid===uid&&e.round===round));
    await sSet("lb_v4",[...filtered,entry].slice(0,1000));
  };

  useEffect(()=>{
    if(activeTab==="lb"){
      sGet("lb_v4").then(data=>{
        if(!data)return;
        const bracket=JSON.parse(localStorage.getItem("bracket_v4")||"{}");
        const standings=getActualGroupStandings();
        const scored=data.map(e=>({...e,pts:calcScore(e.preds||{},bracket,standings)}));
        scored.sort((a,b)=>b.pts-a.pts);
        setLeaderboard(scored.slice(0,30));
      });
    }
    if(activeTab==="groups")loadGroupLeaderboard();
  },[activeTab,loadGroupLeaderboard]);


  return(
    <div>
      <div className="hdr" style={{paddingBottom:0}}>
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:26,color:"#E8FF00",letterSpacing:"0.05em"}}>Predictions</div>
        <div style={{display:"flex",marginTop:8}}>
          {[["picks","&#128302; My Picks"],["lb","&#127941; Leaderboard"],["groups","&#128101; Groups"]].map(([id,label])=>(
            <button key={id} onClick={()=>setActiveTab(id)} style={{flex:1,padding:"10px 0",border:"none",background:"none",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:12,fontWeight:700,color:activeTab===id?"#E8FF00":"#555",borderBottom:activeTab===id?"2px solid #E8FF00":"2px solid transparent"}}>
              <span dangerouslySetInnerHTML={{__html:label}}/>
            </button>
          ))}
        </div>
      </div>
      <div className="scr">
        {activeTab==="picks"&&(
          <>
            <div style={{background:"rgba(232,255,0,0.04)",border:"1px solid rgba(232,255,0,0.1)",borderRadius:12,padding:"10px 12px",marginBottom:14,fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif",lineHeight:1.6}}>
              Each section unlocks when that round begins. Fill in your picks then tap Lock before it starts.
            </div>
            <Block id="groups" label="Group Stage" icon="&#128203;" locks={locks} lockRound={lockRound}>
              {locked=>(
                <>
                  {Object.entries(GROUPS).map(([g,data])=>(
                    <div key={g} style={{marginBottom:14}}>
                      <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:17,color:"#E8FF00",marginBottom:4}}>Group {g}</div>
                      <div style={{fontSize:10,color:"#444",marginBottom:6,fontFamily:"DM Sans,sans-serif"}}>{data.teams.join(" - ")}</div>
                      <div style={{display:"flex",gap:6,marginBottom:6,alignItems:"center"}}>
                        <span style={{fontSize:10,fontWeight:700,color:"#555",minWidth:24,fontFamily:"DM Sans,sans-serif"}}>1st</span>
                        <PredInput value={preds["g"+g+"_1"]} onChange={e=>upd("g"+g+"_1",e.target.value,"groups")} locked={locked} placeholder="1st place..."/>
                      </div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <span style={{fontSize:10,fontWeight:700,color:"#555",minWidth:24,fontFamily:"DM Sans,sans-serif"}}>2nd</span>
                        <PredInput value={preds["g"+g+"_2"]} onChange={e=>upd("g"+g+"_2",e.target.value,"groups")} locked={locked} placeholder="2nd place..."/>
                      </div>
                    </div>
                  ))}
                  <div style={{borderTop:"1px solid #2A2A2A",paddingTop:12,marginTop:4}}>
                    {[["first_out","First team eliminated"],["surprise","Biggest surprise team"]].map(([k,label])=>(
                      <div key={k} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                        <span style={{fontSize:10,color:"#555",minWidth:130,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>{label}</span>
                        <PredInput value={preds[k]} onChange={e=>upd(k,e.target.value,"groups")} locked={locked} placeholder="Team..."/>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Block>
            <Block id="r32" label="Round of 32" icon="&#9876;" locks={locks} lockRound={lockRound}>
              {locked=>(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {Array.from({length:16},(_,i)=>(
                    <div key={i}>
                      <div style={{fontSize:10,color:"#444",marginBottom:4,fontFamily:"DM Sans,sans-serif"}}>Match {i+1} winner</div>
                      <PredInput value={preds["r32_w"+(i+1)]} onChange={e=>upd("r32_w"+(i+1),e.target.value,"r32")} locked={locked} placeholder="Team..."/>
                    </div>
                  ))}
                </div>
              )}
            </Block>
            <Block id="r16" label="Round of 16" icon="&#127919;" locks={locks} lockRound={lockRound}>
              {locked=>(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {Array.from({length:8},(_,i)=>(
                    <div key={i}>
                      <div style={{fontSize:10,color:"#444",marginBottom:4,fontFamily:"DM Sans,sans-serif"}}>Match {i+1} winner</div>
                      <PredInput value={preds["r16_w"+(i+1)]} onChange={e=>upd("r16_w"+(i+1),e.target.value,"r16")} locked={locked} placeholder="Team..."/>
                    </div>
                  ))}
                </div>
              )}
            </Block>
            <Block id="qf" label="Quarterfinals" icon="&#128293;" locks={locks} lockRound={lockRound}>
              {locked=>(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {["QF 1","QF 2","QF 3","QF 4"].map((label,i)=>(
                    <div key={i}>
                      <div style={{fontSize:10,color:"#444",marginBottom:4,fontFamily:"DM Sans,sans-serif"}}>{label}</div>
                      <PredInput value={preds["qf_w"+(i+1)]} onChange={e=>upd("qf_w"+(i+1),e.target.value,"qf")} locked={locked} placeholder="Winner..."/>
                    </div>
                  ))}
                </div>
              )}
            </Block>
            <Block id="sf" label="Semifinals" icon="&#9889;" locks={locks} lockRound={lockRound}>
              {locked=>(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {["SF 1","SF 2"].map((label,i)=>(
                    <div key={i}>
                      <div style={{fontSize:10,color:"#444",marginBottom:4,fontFamily:"DM Sans,sans-serif"}}>{label}</div>
                      <PredInput value={preds["sf_w"+(i+1)]} onChange={e=>upd("sf_w"+(i+1),e.target.value,"sf")} locked={locked} placeholder="Winner..."/>
                    </div>
                  ))}
                </div>
              )}
            </Block>
            <Block id="final" label="The Final" icon="&#127942;" locks={locks} lockRound={lockRound}>
              {locked=>(
                <>
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:11,color:"#888",marginBottom:6,fontFamily:"DM Sans,sans-serif"}}>&#129353; Third place</div>
                    <PredInput value={preds["third"]} onChange={e=>upd("third",e.target.value,"final")} locked={locked} placeholder="Third place team..."/>
                  </div>
                  <div style={{background:"rgba(232,255,0,0.04)",border:"1px solid rgba(232,255,0,0.12)",borderRadius:10,padding:"10px 12px"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#E8FF00",marginBottom:8,fontFamily:"DM Sans,sans-serif"}}>&#127942; World Cup Champion</div>
                    <PredInput value={preds["champion"]} onChange={e=>upd("champion",e.target.value,"final")} locked={locked} placeholder="Who wins the World Cup?"/>
                    <div style={{fontSize:11,color:"#888",margin:"8px 0 5px",fontFamily:"DM Sans,sans-serif"}}>Why will they win?</div>
                    <textarea style={{minHeight:60}} placeholder={locked?"Locked":"Your reasoning..."} value={preds["champion_why"]||""} onChange={e=>upd("champion_why",e.target.value,"final")} readOnly={locked}/>
                    <div style={{marginTop:10}}>
                      {/* Top scorer - any outfield player */}
                      <div style={{display:"flex",gap:8,marginBottom:7,alignItems:"center"}}>
                        <span style={{fontSize:10,color:"#555",minWidth:100,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>Top scorer</span>
                        {locked?<PredInput value={preds["top_scorer"]} onChange={e=>upd("top_scorer",e.target.value,"final")} locked={locked} placeholder="Your pick..."/>:
                          <PlayerInput value={preds["top_scorer"]||""} onChange={e=>upd("top_scorer",e.target.value,"final")} placeholder="Start typing a player name..." teams={[]} gkOnly={false} dark={true}/>}
                      </div>
                      {/* Best goalkeeper - GK only */}
                      <div style={{display:"flex",gap:8,marginBottom:7,alignItems:"center"}}>
                        <span style={{fontSize:10,color:"#555",minWidth:100,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>Best goalkeeper</span>
                        {locked?<PredInput value={preds["best_gk"]} onChange={e=>upd("best_gk",e.target.value,"final")} locked={locked} placeholder="Your pick..."/>:
                          <PlayerInput value={preds["best_gk"]||""} onChange={e=>upd("best_gk",e.target.value,"final")} placeholder="Start typing a goalkeeper name..." teams={[]} gkOnly={true} dark={true}/>}
                      </div>
                      {/* Biggest upset - free text */}
                      <div style={{display:"flex",gap:8,marginBottom:7,alignItems:"center"}}>
                        <span style={{fontSize:10,color:"#555",minWidth:100,fontFamily:"DM Sans,sans-serif",fontWeight:600}}>Biggest upset</span>
                        <PredInput value={preds["biggest_upset"]} onChange={e=>upd("biggest_upset",e.target.value,"final")} locked={locked} placeholder="Your pick..."/>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Block>
          </>
        )}

        {activeTab==="lb"&&(
          <>
            <div style={{background:"rgba(232,255,0,0.04)",border:"1px solid rgba(232,255,0,0.1)",borderRadius:12,padding:"10px 12px",marginBottom:14,fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif",lineHeight:1.6}}>
              Lock rounds to appear here. Points: 1pt group picks - 2pt R32 - 3pt R16 - 5pt QF - 8pt SF - 15pt Final - 20pt correct champion.
            </div>
            {leaderboard.length===0?(
              <div style={{textAlign:"center",padding:"40px 20px"}}>
                <div style={{fontSize:36,marginBottom:12}}>&#127941;</div>
                <div style={{fontSize:14,color:"#555",fontFamily:"DM Sans,sans-serif",fontWeight:600}}>No entries yet</div>
                <div style={{fontSize:12,color:"#444",marginTop:6,fontFamily:"DM Sans,sans-serif"}}>Lock your group stage picks to appear here</div>
              </div>
            ):(
              leaderboard.map((entry,idx)=>(
                <div key={idx} style={{background:entry.uid===uid?"rgba(232,255,0,0.07)":"#1A1A1A",border:"1px solid "+(entry.uid===uid?"rgba(232,255,0,0.25)":"#2A2A2A"),borderRadius:12,padding:"12px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                  <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:24,minWidth:30,textAlign:"center",color:idx===0?"#E8FF00":idx===1?"#AAAAAA":idx===2?"#CD7F32":"#444"}}>{idx+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>{entry.uid===uid?"&#128073; You":(entry.name||"Fan #"+entry.uid.slice(0,6).toUpperCase())}</div>
                    <div style={{fontSize:10,color:"#555",fontFamily:"DM Sans,sans-serif"}}>Locked: {entry.round}</div>
                  </div>
                  <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:22,color:"#E8FF00"}}>{entry.pts}<span style={{fontSize:10,color:"#555",fontFamily:"DM Sans,sans-serif"}}> pts</span></div>
                </div>
              ))
            )}
          </>
        )}

        {/* ---- GROUPS TAB ---- */}
        {activeTab==="groups"&&(
          <>
            {!myGroupCode?(
              <>
                <div style={{background:"rgba(0,174,239,0.05)",border:"1px solid rgba(0,174,239,0.15)",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif",lineHeight:1.6}}>
                  <span style={{color:"#00AEEF",fontWeight:700}}>Compete with your team or class. </span>
                  Create a group and share the code, or enter a code to join an existing group. Lock your picks to appear on the leaderboard.
                </div>
                <div className="card" style={{marginBottom:12}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#E8FF00",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Create a Group</div>
                  <input
                    style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid #2A2A2A",borderRadius:10,padding:"10px 12px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:13,marginBottom:10}}
                    placeholder="Group name (e.g. Cap City U12 Boys)..."
                    value={groupNameInput}
                    onChange={e=>setGroupNameInput(e.target.value)}
                  />
                  {groupError&&<div style={{fontSize:11,color:"#FF4B4B",marginBottom:8,fontFamily:"DM Sans,sans-serif"}}>{groupError}</div>}
                  <button onClick={createGroup} disabled={groupLoading} style={{width:"100%",padding:"11px",background:"#E8FF00",border:"none",borderRadius:10,color:"#000",fontFamily:"DM Sans,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                    {groupLoading?"Creating...":"Create Group"}
                  </button>
                </div>
                <div className="card">
                  <div style={{fontSize:11,fontWeight:700,color:"#00AEEF",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Join a Group</div>
                  <input
                    style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid #2A2A2A",borderRadius:10,padding:"10px 12px",color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontSize:16,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:10}}
                    placeholder="Enter group code..."
                    value={groupInput}
                    onChange={e=>setGroupInput(e.target.value.toUpperCase())}
                    maxLength={6}
                  />
                  {groupError&&<div style={{fontSize:11,color:"#FF4B4B",marginBottom:8,fontFamily:"DM Sans,sans-serif"}}>{groupError}</div>}
                  <button onClick={joinGroup} disabled={groupLoading} style={{width:"100%",padding:"11px",background:"rgba(0,174,239,0.12)",border:"1px solid rgba(0,174,239,0.3)",borderRadius:10,color:"#00AEEF",fontFamily:"DM Sans,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                    {groupLoading?"Joining...":"Join Group"}
                  </button>
                </div>
              </>
            ):(
              <>
                <div style={{background:"linear-gradient(135deg,#001A2A,#1A1A1A)",border:"1px solid rgba(0,174,239,0.3)",borderRadius:14,padding:"16px",marginBottom:14}}>
                  <div style={{fontSize:10,color:"#00AEEF",textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"DM Sans,sans-serif",marginBottom:4}}>Your Group</div>
                  <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:28,color:"#F5F5F5",letterSpacing:"0.03em"}}>{myGroupName}</div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginTop:10}}>
                    <div style={{flex:1,background:"rgba(0,174,239,0.1)",border:"1px solid rgba(0,174,239,0.25)",borderRadius:8,padding:"8px 12px"}}>
                      <div style={{fontSize:9,color:"#00AEEF",fontFamily:"DM Sans,sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>Group Code</div>
                      <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:28,color:"#E8FF00",letterSpacing:"0.2em"}}>{myGroupCode}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      <button onClick={async()=>{if(navigator.share){try{await navigator.share({title:"Join my SST2026 group",text:"Use code "+myGroupCode+" to join my SST2026 prediction group!"});}catch{}}else{try{await navigator.clipboard.writeText(myGroupCode);}catch{}}}} style={{padding:"7px 12px",background:"rgba(232,255,0,0.1)",border:"1px solid rgba(232,255,0,0.3)",borderRadius:8,color:"#E8FF00",fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>{navigator.share?"Share Code":"Copy Code"}</button>
                      <button onClick={leaveGroup} style={{padding:"7px 12px",background:"rgba(255,75,75,0.08)",border:"1px solid rgba(255,75,75,0.2)",borderRadius:8,color:"#FF4B4B",fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer"}}>Leave</button>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:"#555",marginTop:10,fontFamily:"DM Sans,sans-serif"}}>Share this code with your team. Lock your picks above to appear on the leaderboard.</div>
                </div>
                <div style={{fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,fontFamily:"DM Sans,sans-serif"}}>Group Leaderboard</div>
                {groupLeaderboard.length===0?(
                  <div style={{textAlign:"center",padding:"30px 20px"}}>
                    <div style={{fontSize:36,marginBottom:10}}>&#127941;</div>
                    <div style={{fontSize:13,color:"#555",fontFamily:"DM Sans,sans-serif",fontWeight:600}}>No picks locked yet</div>
                    <div style={{fontSize:11,color:"#444",marginTop:6,fontFamily:"DM Sans,sans-serif"}}>Lock your picks and share the code with your group to start competing</div>
                  </div>
                ):(
                  groupLeaderboard.map((entry,idx)=>(
                    <div key={entry.uid} style={{background:entry.uid===uid?"rgba(232,255,0,0.07)":"#1A1A1A",border:"1px solid "+(entry.uid===uid?"rgba(232,255,0,0.25)":"#2A2A2A"),borderRadius:12,padding:"12px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                      <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:24,minWidth:30,textAlign:"center",color:idx===0?"#E8FF00":idx===1?"#AAAAAA":idx===2?"#CD7F32":"#444"}}>{idx+1}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#F5F5F5",fontFamily:"DM Sans,sans-serif"}}>{entry.uid===uid?"You":(entry.name||"Fan #"+entry.uid.slice(0,6).toUpperCase())}</div>
                        <div style={{fontSize:10,color:"#555",fontFamily:"DM Sans,sans-serif"}}>Locked: {entry.round}</div>
                      </div>
                      <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:22,color:"#E8FF00"}}>{entry.pts}<span style={{fontSize:10,color:"#555",fontFamily:"DM Sans,sans-serif"}}> pts</span></div>
                    </div>
                  ))
                )}
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}

/* -- HIGHLIGHTS SCREEN ------------------------------------------- */
function HighlightsScreen(){
  const done=DAYS.filter(d=>dayHasSave(d.day));
  const allBestPlayers=done.map(d=>{
    try{const s=localStorage.getItem("ws_bp_"+d.day);return s?JSON.parse(s):null;}catch{return null;}
  }).filter(Boolean);
  // Extract individual teams from each selected game (e.g. "Mexico vs South Africa" -> ["Mexico","South Africa"])
  const allGames=done.map(d=>{
    try{const s=localStorage.getItem("ws_game_"+d.day);return s?JSON.parse(s):null;}catch{return null;}
  }).filter(Boolean);
  const teamCounts={};
  allGames.forEach(g=>{
    const parts=g.split(" vs ");
    if(parts.length===2){
      // Only count the team they actually chose to "watch" that day
      // The selected game string IS the full game - we track all teams seen
      parts.forEach(t=>{const team=t.trim();teamCounts[team]=(teamCounts[team]||0)+1;});
    }
  });
  // But we want the team they picked most - use ws_team if available, else split game
  const watchedTeams=done.map(d=>{
    try{
      const game=localStorage.getItem("ws_game_"+d.day);
      if(!game)return null;
      const parsed=JSON.parse(game);
      const parts=parsed.split(" vs ");
      // Return the full game's teams - we track all appearances
      return parts.map(t=>t.trim());
    }catch{return null;}
  }).filter(Boolean).flat();
  const watchCounts={};watchedTeams.forEach(t=>{watchCounts[t]=(watchCounts[t]||0)+1;});
  const topTeams=Object.entries(watchCounts).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const[preds]=useLS("preds_v4",{});

  return(
    <div>
      <div className="hdr">
        <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:26,color:"#E8FF00",letterSpacing:"0.05em"}}>&#127942; My Highlights</div>
        <div style={{fontSize:11,color:"#888",fontFamily:"DM Sans,sans-serif"}}>Your World Cup 2026 summary</div>
      </div>
      <div className="scr">
        {/* Big stats */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[
            ["Days Completed",done.length+"/34","&#128197;"],
            ["Streak",calcStreak()+" days","&#128293;"],
          ].map(([label,val,icon])=>(
            <div key={label} style={{background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:14,padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:6}} dangerouslySetInnerHTML={{__html:icon}}/>
              <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:32,color:"#E8FF00",lineHeight:1}}>{val}</div>
              <div style={{fontSize:10,color:"#888",fontFamily:"DM Sans,sans-serif",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:4}}>{label}</div>
            </div>
          ))}
        </div>

        {topTeams.length>0&&(
          <div className="card" style={{marginBottom:10}}>
            <div style={{fontSize:10,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"DM Sans,sans-serif",marginBottom:10}}>Teams You Watched Most</div>
            {topTeams.map(([team,count],i)=>(
              <div key={team} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:i<topTeams.length-1?"1px solid #2A2A2A":"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:22,color:i===0?"#E8FF00":i===1?"#AAAAAA":"#888",minWidth:24}}>{i+1}</div>
                  <div style={{fontFamily:"DM Sans,sans-serif",fontSize:14,fontWeight:700,color:i===0?"#F5F5F5":"#888"}}>{team}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{height:6,background:i===0?"#E8FF00":"#2A2A2A",borderRadius:3,width:Math.round((count/topTeams[0][1])*80)+"px",minWidth:8}}/>
                  <div style={{fontSize:11,color:i===0?"#E8FF00":"#555",fontFamily:"DM Sans,sans-serif",fontWeight:600,minWidth:30,textAlign:"right"}}>{count}x</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {allBestPlayers.length>0&&(
          <div className="card" style={{marginBottom:10}}>
            <div style={{fontSize:10,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"DM Sans,sans-serif",marginBottom:10}}>Your Best Player Picks</div>
            {allBestPlayers.slice(0,5).map((p,i)=>(
              <div key={i} style={{padding:"5px 0",borderBottom:i<Math.min(allBestPlayers.length,5)-1?"1px solid #2A2A2A":"none",fontSize:13,color:"#F5F5F5",fontFamily:"DM Sans,sans-serif",fontWeight:600}}>
                &#11088; {p}
              </div>
            ))}
          </div>
        )}

        {preds["champion"]&&(
          <div style={{background:"linear-gradient(135deg,#1A1A00,#1A1A1A)",border:"2px solid rgba(232,255,0,0.3)",borderRadius:14,padding:"16px",marginBottom:10,textAlign:"center"}}>
            <div style={{fontSize:10,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:"DM Sans,sans-serif",marginBottom:8}}>Your Predicted Champion</div>
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:36,color:"#E8FF00"}}>{preds["champion"]}</div>
            {preds["champion_why"]&&<div style={{fontSize:12,color:"#888",marginTop:8,fontFamily:"DM Sans,sans-serif",fontStyle:"italic",lineHeight:1.5}}>{preds["champion_why"]}</div>}
          </div>
        )}

        {done.length===0&&(
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:48,marginBottom:12}}>&#9917;</div>
            <div style={{fontSize:14,color:"#555",fontFamily:"DM Sans,sans-serif",fontWeight:600}}>No worksheets completed yet</div>
            <div style={{fontSize:12,color:"#444",marginTop:6,fontFamily:"DM Sans,sans-serif"}}>Complete your first worksheet on June 11 to start building your highlights</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -- MAIN APP ---------------------------------------------------- */
export default function App(){
  const[tab,setTab]=useState("home");
  const[prevTab,setPrevTab]=useState("home");
  const[dayNum,setDayNum]=useState(null);
  const{getScore,updated,loading,err,refresh}=useLiveScores();
  const[username,setUsername]=useState(()=>{try{const s=localStorage.getItem("sst2026_username");return s?JSON.parse(s):"";}catch{return "";}});
  const showPrompt=username==="";

  const goToDay=d=>{setPrevTab(tab);setDayNum(d);setTab("worksheet");};
  const back=()=>{setDayNum(null);setTab(prevTab);};

  const NAV=[
    {id:"home",emoji:"&#9917;",label:"Worksheets"},
    {id:"groups",emoji:"&#128202;",label:"Groups"},
    {id:"bracket",emoji:"&#127942;",label:"Bracket"},
    {id:"predictions",emoji:"&#128302;",label:"Picks"},
    {id:"highlights",emoji:"&#11088;",label:"My Stats"},
  ];

  return(
    <>
      {showPrompt&&<UsernamePrompt onSet={n=>{setUsername(n);}}/>}
      <div className="app-shell">
      <div className="app">
        {tab==="worksheet"&&dayNum?<WorksheetScreen dayNum={dayNum} onBack={back} getScore={getScore}/>:
         tab==="home"?<HomeScreen onGoToDay={goToDay} getScore={getScore}/>:
         tab==="groups"?<GroupsScreen getScore={getScore}/>:
         tab==="bracket"?<BracketScreen/>:
         tab==="predictions"?<PredictionsScreen/>:
         tab==="highlights"?<HighlightsScreen/>:null}
        {tab!=="worksheet"&&(
          <nav className="nav">
            {NAV.map(n=>(
              <button key={n.id} className={"nb"+(tab===n.id?" active":"")} onClick={()=>setTab(n.id)}>
                <span className="ni" dangerouslySetInnerHTML={{__html:n.emoji}}/>
                <span className="nl">{n.label}</span>
              </button>
            ))}
          </nav>
        )}
        {tab!=="worksheet"&&(
          <div style={{position:"sticky",bottom:0,width:"100%",background:"rgba(10,10,10,0.95)",borderTop:"1px solid #1A1A1A",padding:"3px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:99}}>
            <span style={{fontSize:10,color:"#444",fontFamily:"DM Sans,sans-serif"}}>{loading?"Updating...":updated?("Updated "+(Math.round((new Date()-updated)/60000)||"<1")+"m ago"):"Connecting..."}{err?" Offline":""}</span>
            <button onClick={refresh} style={{background:"none",border:"none",color:"#444",fontSize:10,cursor:"pointer",fontFamily:"DM Sans,sans-serif",padding:"2px 6px"}}>&#8635; Refresh</button>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
