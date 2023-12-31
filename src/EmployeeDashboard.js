import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import das from './assets/TeamMembersCard/das.svg';
import takeass from './assets/TeamMembersCard/takeass.svg';
import kaninilogo from './assets/TeamMembersCard/kaninilogo.svg';
import allocateass from './assets/TeamMembersCard/allocateass.svg';
import result from './assets/TeamMembersCard/result.svg';
import team1 from './assets/TeamMembersCard/teammem.svg';
import setting from './assets/TeamMembersCard/setting.svg';
import logout from './assets/TeamMembersCard/logout.svg';
import AssessmentsBulb from './assets/EmployeeDashboardImages/Bulb.png';

export default function EmployeeDashboard() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userImageURL, setUserImageURL] = useState('');
  const [swaggerData, setSwaggerData] = useState([]);
  const [totalPoints, setTotalPoints] = useState('0');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetByEmail?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        setProfileData(data);
        if (data && data[0] && data[0].user_Image) {
          const binaryData = atob(data[0].user_Image);
          const byteArray = new Uint8Array(binaryData.length);

          for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
          }

          const blob = new Blob([byteArray]);
          const imageURL = URL.createObjectURL(blob);

          setUserImageURL(imageURL);
        }

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();

    const fetchData1 = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetByEmailID?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        if (data && data.id) {
          localStorage.setItem('id', data.id);
        }
      } catch (error) {
        console.error('Error fetching data from the second API:', error);
      }
    };

    fetchData1();

    const fetchSwaggerData = async () => {
      try {
        const response = await fetch(`https://localhost:7198/api/Users/GetUnmatchedUserByEmail?userEmail=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        setSwaggerData(data);
      } catch (error) {
        console.error('Error fetching Swagger data:', error);
      }
    };

    fetchSwaggerData();
  }, []);

  useEffect(() => {
    if (profileData && profileData[0] && profileData[0].user_ID) {
      const userID = profileData[0].user_ID;
      localStorage.setItem('userID', userID);
    }

    setLoading(false);
  }, [profileData]);

  const fetchTotalPoints = async () => {
    try {
      const userID = localStorage.getItem('userID');
      if (!userID) return;
      const randomQueryParam = Math.random().toString(36).substring(7);
      const response = await fetch(`https://localhost:7198/api/Results/GetTotalPointsByUserId/${userID}?rnd=${randomQueryParam}`);
      const data = await response.json();
      if (data !== null && !isNaN(data)) {
        setTotalPoints(String(data));
      } else {
        setTotalPoints('0');
      }
    } catch (error) {
      console.error('Error fetching total points:', error);
      setTotalPoints('0');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTotalPoints();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fetchResultCount = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`https://localhost:7198/api/Users/GetUsersByEmailWithResultCount?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      if (data && Array.isArray(data) && data.length > 0) {
        const resultCount = data[0].resultCount;
        document.querySelector('.NumberOfCompletedAssessed').textContent = `${resultCount}`;
      }
    } catch (error) {
      console.error('Error fetching result count:', error);
    }
  };

  useEffect(() => {
    fetchResultCount();
  }, []);

  const getButtonClassName = (path) => {
    return window.location.pathname === path ? 'activeButton' : 'inactiveButton';
  };

  return (
    <>
      <style>
        {`.body {
    background: #1E1E1E;
    overflow-x: hidden;
}

.SidebarNew {
    position: absolute;
    width: 280px;
    height: 1080px;
    left: 0px;
    top: 0px;
    background: linear-gradient(179.54deg, #9cd8ef 5.55%, #96d9f4 194.36%);
  }
.kaninilogoNew { 
    width:93px;
    height:47px;
    position:absolute;
    left:123px;
    top:50px;
}
.kaninilogo1New { 
    color:rgba(12.000000234693289, 17.00000088661909, 22.000000588595867, 1);
    width:93px;
    height:33px;
    position:absolute;
    left:3px;
    top:0px;
    font-family:Roboto;
    text-align:left;
    font-size:28px;
    letter-spacing:10;
}
.kaninilogo2New { 
    color:rgba(55.17031118273735, 63.178905844688416, 71.18750050663948, 1);
    width:93px;
    height:19px;
    position:absolute;
    left:3px;
    top:28px;
    font-family:Manrope;
    text-align:left;
    font-size:14px;
    letter-spacing:9;
}
.kaninilogo3New { 
    width:47px;
    height:47px;
    position:absolute;
    left:55px;
    top:50px;
    background-repeat:no-repeat;
    background-size:cover;
}
.dashboardNew { 
    position:absolute;
    left:100px;
    top:155px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.dashboard1New { 
    position:absolute;
    left:55px;
    top:154px;
    right:237px;
    bottom:905px;
}
.TakeassNew { 
    position:absolute;
    left:100px;
    top: 220px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.Takeass1New { 
    position:absolute;
    left:55px;
    top:220px;
    right:237px;
    bottom:824.39px;
}
.AllocateassNew { 
    position:absolute;
    left:100px;
    top: 290px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.Allocateass1New { 
    position:absolute;
    left:55px;
    top:290px;
    right:240px;
    bottom:741px;
}
.ResultNew { 
    position:absolute;
    left:100px;
    top: 424px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;
}
.Result1New { 
    position:absolute;
    left:55px;
    top:424px;
    right:240px;
    bottom: 656px;
}
.teammemNew{
    position:absolute;
    left:100px;
    top: 360px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;

}
.Team1New{
    position:absolute;
    left:55px;
    top:360px;
    right: 235px;
    bottom: 574.95px;

}
.SettingsNew{
    position:absolute;
    left:100px;
    top: 480px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;

}
.Settings1New{
    position:absolute;
    left:55px;
    top:480px;
    right: 237px;
    bottom: 491.38px;

}
.LogoutNew{
    position:absolute;
    left:100px;
    top: 991px;
    font-family:Manrope;
    text-align:left;
    font-size:16px;
    letter-spacing:0;
    cursor: pointer;

}
.Logout1New{
    position:absolute;
    left:55px;
    top:991px;
    right: 242.55px;
    bottom: 69px;

}

.rectangleNew {
   /* Kanini Logo_H1 1 */

position: absolute;
width: 980px;
height: 420px;
left:-730px;
top: 720px;

background: url(assets/TeamMembersCard/bg.svg);
opacity: 1.06;
  }
  
  body, .OverviewTitle, .OngoingAssessedText, .CompletedAssessedText, .PointsEarnedText, .BadgesEarnedTitle, 
  .SkillLevel, .QuickAccess, .Assessments, .AssessmentResultQuickAccess, .ReportingManagerTitle, .YourHRspocTitle,
  .ColleagueTitle, .ViewAllColleague, .WelcomeTitle, .WelcomeDetails, .AddQuestionsText, .ProfileName, .EmployeeID,
  .EmployeePosition, .EmployeeRole, .ColleagueMembers1ID, .ColleagueMembers1Points, .ColleagueMembers1RoleSkillLevel,
  .ColleagueMembers2ID, .ColleagueMembers2Points, .ColleagueMembers1RoleSkillLevel, .ColleagueMembers3ID,
  .ColleagueMembers3Points, .ColleagueMembers1RoleSkillLevel, .ColleagueMembers4ID, .ColleagueMembers4Points,
  .ColleagueMembers1RoleSkillLevel {
    font-family: 'Manrope', sans-serif;
  }
  
  /* Roboto font */
  .NumberOfOngoingAssessed, .NumberOfCompletedAssessed, .NumberOfPointsEarned, .NumberOfAssessment,
  .NumberOfAssessmentResult, .ReportingManagerName, .ReportingManagerRole, .YourHRspocName, .YourHRspocRole {
    font-family: 'Roboto', sans-serif;
  }
  
  .fullbody{
   overflow-x: hidden;
  }
  
  .OverviewTitle {
      /* Overview */
      position: absolute;
      width: 105px;
      height: 33px;
      left: 340px;
      top: 320px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */
  
      letter-spacing: -0.01em;
  
      color: #000000;
  }
  
  /* Overview Display */
  .Overview {
      position: absolute;
      width: 490px;
      height: 182px;
      left: 340px;
      top: 385px;
      height: 182px;
      width: 490px;
      left: 340px;
      top: 385px;
      border-radius: 13px;
      box-sizing: border-box;
  
      background: #FFFFFF;
      border: 1px solid #E1E7EE;
      border-radius: 13px;
  
      /* for Black Layout */
  }
  
  .OngoingAssessed {
      position: absolute;
      width: 79px;
      height: 134px;
      left: 384px;
      top: 409px;
  }
  
  .OngoingAssessedSVG {
      position: absolute;
      left: 20%;
      right: 78.31%;
      top: 37.87%;
      bottom: 58.8%;
  
      /* PRIMARY_BLUE/PRI-2-400 */
  
      /* background: #1CAAE2; */
      height: 36px;
      width: 32.400001525878906px;
      left: 384px;
      top: 409px;
      border-radius: 0px;
      height: 36px;
      width: 32.400001525878906px;
      left: 384px;
      top: 409px;
      border-radius: 0px;
      background: url(assets/EmployeeDashboardImages/OngoingAssessed.svg)
  
  }
  
  .OngoingAssessedText {
      position: absolute;
      width: 79px;
      height: 40px;
      left: 384px;
      top: 460px;
  
      /* font-family: 'Manrope'; */
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
      display: flex;
      align-items: center;
  
      color: #979797;
      font-family: Manrope;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
  
  }
  
  .SidebarNew {
      position: absolute;
      width: 280px;
      height: 1080px;
      left: 0px;
      top: 0px;
      background: linear-gradient(179.54deg, #9cd8ef 5.55%, #96d9f4 194.36%);
    }
  .kaninilogoNew { 
      width:93px;
      height:47px;
      position:absolute;
      left:123px;
      top:50px;
  }
  .kaninilogo1New { 
      color:rgba(12.000000234693289, 17.00000088661909, 22.000000588595867, 1);
      width:93px;
      height:33px;
      position:absolute;
      left:3px;
      top:0px;
      font-family:Roboto;
      text-align:left;
      font-size:28px;
      letter-spacing:10;
  }
  .kaninilogo2New { 
      color:rgba(55.17031118273735, 63.178905844688416, 71.18750050663948, 1);
      width:93px;
      height:19px;
      position:absolute;
      left:3px;
      top:28px;
      font-family:Manrope;
      text-align:left;
      font-size:14px;
      letter-spacing:9;
  }
  .kaninilogo3New { 
      width:47px;
      height:47px;
      position:absolute;
      left:55px;
      top:50px;
      background-repeat:no-repeat;
      background-size:cover;
  }
  .dashboardNew { 
      position:absolute;
      left:100px;
      top:155px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .dashboard1New { 
      position:absolute;
      left:55px;
      top:154px;
      right:237px;
      bottom:905px;
  }
  .TakeassNew { 
      position:absolute;
      left:100px;
      top: 220px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .Takeass1New { 
      position:absolute;
      left:55px;
      top:220px;
      right:237px;
      bottom:824.39px;
  }
  .AllocateassNew { 
      position:absolute;
      left:100px;
      top: 290px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .Allocateass1New { 
      position:absolute;
      left:55px;
      top:290px;
      right:240px;
      bottom:741px;
  }
  .ResultNew { 
      position:absolute;
      left:100px;
      top: 424px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .Result1New { 
      position:absolute;
      left:55px;
      top:424px;
      right:240px;
      bottom: 656px;
  }
  .teammemNew{
      position:absolute;
      left:100px;
      top: 360px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  
  }
  .Team1New{
      position:absolute;
      left:55px;
      top:360px;
      right: 235px;
      bottom: 574.95px;
  
  }
  .SettingsNew{
      position:absolute;
      left:100px;
      top: 480px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  
  }
  .Settings1New{
      position:absolute;
      left:55px;
      top:480px;
      right: 237px;
      bottom: 491.38px;
  
  }
  .LogoutNew{
      position:absolute;
      left:100px;
      top: 991px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  
  }
  .Logout1New{
      position:absolute;
      left:55px;
      top:991px;
      right: 242.55px;
      bottom: 69px;
  
  }
  
  .rectangleNew {
     /* Kanini Logo_H1 1 */
  
  position: absolute;
  width: 980px;
  height: 420px;
  left:-730px;
  top: 720px;
  
  background: url(assets/TeamMembersCard/bg.svg);
  opacity: 1.06;
  
    }
  
  .NumberOfOngoingAssessed {
  
      /* JS functionality needed to be added (IMPORTANT) */
      position: absolute;
      width: 14px;
      height: 33px;
      left: 384px;
      top: 510px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */
  
      display: flex;
      align-items: center;
  
      color: #2E3747;
  
  }
  
  .CompletedAssessed {
      position: absolute;
      width: 79px;
      height: 134px;
      left: 545px;
      top: 409px;
  }
  
  .CompletedAssessedSVG {
      position: absolute;
      left: 28.39%;
      right: 69.74%;
      top: 37.87%;
      bottom: 59.19%;
  
      /* PRIMARY_BLUE/PRI-2-400 */
  
      /* background: #1CAAE2; */
      height: 31.76470375061035px;
      width: 36px;
      left: 545px;
      top: 409px;
      border-radius: 0px;
      height: 31.76470375061035px;
      width: 36px;
      left: 545px;
      top: 409px;
      border-radius: 0px;
      background: url(assets/EmployeeDashboardImages/CompletedAssessed.svg)
  }
  
  .CompletedAssessedText {
      position: absolute;
      width: 79px;
      height: 40px;
      left: 545px;
      top: 460px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
      display: flex;
      align-items: center;
  
      color: #979797;
      font-family: Manrope;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
  
  }
  
  .NumberOfCompletedAssessed {
      position: absolute;
      width: 15px;
      height: 33px;
      left: 545px;
      top: 510px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */
  
      display: flex;
      align-items: center;
  
      color: #2E3747;
      font-family: Manrope;
      font-size: 24px;
      font-weight: 700;
      line-height: 33px;
      letter-spacing: 0em;
      text-align: left;
  
  }
  
  .PointsEarned {
      position: absolute;
      width: 79px;
      height: 134px;
      left: 707px;
      top: 409px;
  
  }
  
  .PointsEarnedSVG {
      /* Vector */
  
  
      position: absolute;
      left: 36.82%;
      right: 61.3%;
      top: 37.87%;
      bottom: 58.8%;
  
      /* PRIMARY_BLUE/PRI-2-400 */
  
      /* background: #1CAAE2; */
      height: 36px;
      width: 36px;
      left: 707px;
      top: 409px;
      border-radius: 0px;
      background: url(assets/EmployeeDashboardImages/PointsEarned.svg)
  
  }
  
  .PointsEarnedText {
      position: absolute;
      width: 79px;
      height: 40px;
      left: 707px;
      top: 460px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
      display: flex;
      align-items: center;
  
      color: #979797;
      font-family: Manrope;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
  
  }
  
  .NumberOfPointsEarned {
      /* 150 */
  
  
      position: absolute;
      width: 41px;
      height: 33px;
      left: 707px;
      top: 510px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */
  
      display: flex;
      align-items: center;
  
      color: #2E3747;
      font-family: Manrope;
      font-size: 24px;
      font-weight: 700;
      line-height: 33px;
      letter-spacing: 0em;
      text-align: left;
  
  }
  
  .BadgesEarnedTitle {
      /* Badge Earned */
  
  
      position: absolute;
      width: 158px;
      height: 33px;
      left: 902px;
      top: 320px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      white-space: nowrap;
      /* identical to box height */
  
      display: flex;
      align-items: center;
  
      color: #0D0E14;
  }
  
  .BadgesEarned {
      position: absolute;
      width: 490px;
      height: 182px;
      left: 902px;
      top: 385px;
      /* for Black Layout */
      /* Rectangle 11831 */
  
  
      box-sizing: border-box;
  
      position: absolute;
      width: 490px;
      height: 182px;
      left: 902px;
      top: 385px;
  
      background: #FFFFFF;
      border: 1px solid #E1E7EE;
      border-radius: 13px;
  }
  
  .QuickAccess {
      position: absolute;
      width: 150px;
      height: 33px;
      left: 340px;
      top: 653px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      line-height: 33px;
      /* identical to box height */
  
      letter-spacing: -0.01em;
  
      color: #000000;
  
  }
  
  .QuickaccessAssessment {
      position: absolute;
      width: 490px;
      height: 160px;
      left: 340px;
      top: 715px;
  
      /* LAYOUT_COLOR/LAYOUT-01 */
  
      background: #FFFFFF;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
      border-radius: 8px;
      /* for Black Layout */
  
  }
  
  .Assessments {
      position: absolute;
      height: 31.17px;
      left: 32.87%;
      right: 66.56%;
      top: 40px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 30px;
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
  
  }
  
  .NumberOfAssessment {
      position: absolute;
      height: 48.83px;
      left: 25.87%;
      right: 62.34%;
      top: calc(50% - 48.83px/2 + 48.45px);
  
      /* Paragraph/Regular/16px */
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      white-space: nowrap;
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
  
  }
  
  .NumberOfAssessmentArrow {
      position: absolute;
      left: 94.17%;
      right: 55.92%;
      top: 45.26%;
      bottom: 22.57%;
  
      /* PRIMARY_01/PRI-1-400 */
  
      background: #AAD064;
      transform: rotate(0deg);
      background: url(assets/EmployeeDashboardImages/AssessmentArrow.svg)
  }
  
  .AssessmentsLogoEllipse {
      box-sizing: border-box;
  
      position: absolute;
      width: 98px;
      height: 98px;
      left: 366px;
      top: 746px;
  
      /* PRIMARY_01/PRI-1-50 */
  
      background: #F3F9E9;
      /* PRIMARY_01/PRI-1-50 */
  
      border: 2px solid #F3F9E9;
      border-radius: 95px;
      
  }
  
  .AssessmentsLogoEllipseVector {
      /* Vector */
      position: absolute;
      left: 29.57%;
      right: 77.34%;
      top: 28.76%;
      bottom: 24.54%;
    
      /* PRIMARY_01/PRI-1-300 */
      background: #bad881;
      background-image: url(assets/EmployeeDashboardImages/AssessmentsBulb.svg);
    
      /* Higher z-index */
      z-index: 9999;
    }
    
  
  .AssessmentsResultLogoEllipse {
      box-sizing: border-box;
  
      position: absolute;
      width: 98px;
      height: 98px;
      left: 30px;
      top: 32px;
      border-radius: 95px;
  
      /* PRIMARY_01/PRI-1-50 */
  
      background: #F3F9E9;
      /* PRIMARY_01/PRI-1-50 */
  
      border: 2px solid #F3F9E9;
      
  
  }
  
  .AssessmentsResultLogoEllipseVector {
      /* Vector */
  
  
      position: absolute;
      left: 28.9%;
      right: 48.02%;
      top: 31.04%;
      bottom: 24.81%;
  
      /* PRIMARY_01/PRI-1-300 */
      background-image: url(assets/EmployeeDashboardImages/AssessmentResultBook.svg)
  }
  
  .QuickaccessAssessmentResult {
      position: absolute;
      width: 490px;
      height: 160px;
      left: 902px;
      top: 715px;
      position: absolute;
      width: 451.59px;
      height: 160px;
      left: 902px;
      top: 715px;
  
      /* LAYOUT_COLOR/LAYOUT-01 */
  
      background: #FFFFFF;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
      border-radius: 8px;
      /* for Black Layout */
  }
  
  .AssessmentResultQuickAccess {
      position: absolute;
      height: 31.17px;
      left: 32.87%;
      right: 66.56%;
      top: 43px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 30px;
      white-space: nowrap;
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
  }
  
  .NumberOfAssessmentResult {
      position: absolute;
      height: 48.83px;
      left: 33.14%;
      right: 33.07%;
      top: calc(50% - 48.83px/2 + 28.45px);
  
      /* Paragraph/Regular/16px */
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
      /* white-space: nowrap; */
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
  }
  
  .AssessmentsResultLogoEllipseArrow {
      position: absolute;
      left: 94.17%;
      right: 55.92%;
      top: 45.26%;
      bottom: 22.57%;
  
      /* PRIMARY_01/PRI-1-400 */
  
      background: #AAD064;
      transform: rotate(0deg);
      background-image: url(assets/EmployeeDashboardImages/AssessmentArrow.svg)
  }
  
  .ReportingManagerTitle {
      position: absolute;
      width: 200px;
      height: 27px;
      left: 1438px;
      top: 172px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      letter-spacing: 0.2px;
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
  }
  
  .ReportingManagerProfile {
      box-sizing: border-box;
  
      position: absolute;
      width: 200px;
      height: 251px;
      left: 1438px;
      top: 229px;
  
      /* LAYOUT_COLOR/LAYOUT-01 */
  
      background: #FFFFFF;
      /* TEXT_COLOR/TEXT-200 */
  
      border: 1px solid #EAECEE;
      border-radius: 10px;
      height: 251px;
      width: 200px;
      left: 1438px;
      top: 229px;
      border-radius: 10px;
  
  }
  
  .ReportingManagerName {
      /* Sachin Borkar */
  
  
      position: absolute;
      width: 119px;
      height: 25px;
      left: 30px;
      top: 184px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      white-space: nowrap;
      /* identical to box height */
  
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
      font-family: 'Manrope';
      font-size: 17px;
      font-weight: 600;
      line-height: 25px;
      letter-spacing: 0em;
      text-align: center;
  
  }
  
  .ReportingManagerRole {
      /* 2080 | Manager */
  
  
      position: absolute;
      width: 89px;
      height: 16px;
      left: 70px;
      top: 214px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
      font-family: 'Manrope';
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
  
  }
  
  .YourHRspocTitle {
      position: absolute;
      width: 200px;
      height: 27px;
      left: 1680px;
      top: 172px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      letter-spacing: 0.2px;
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
  }
  
  .YourHRspocProfile {
      box-sizing: border-box;
  
      position: absolute;
      width: 200px;
      height: 251px;
      left: 1680px;
      top: 229px;
  
      /* LAYOUT_COLOR/LAYOUT-01 */
  
      background: #FFFFFF;
      /* TEXT_COLOR/TEXT-200 */
  
      border: 1px solid #EAECEE;
      border-radius: 10px;
      height: 251px;
      width: 200px;
      left: 1680px;
      top: 229px;
      border-radius: 10px;
  
  }
  
  .YourHRspocProfilePicture {
      /* Frame 427318746 */
  
  
      box-sizing: border-box;
  
      position: absolute;
      width: 137px;
      height: 137px;
      left: 32px;
      top: 24px;
  
      background: url(assets/EmployeeDashboardImages/HRspocpic.svg);
      border-radius: 100px;
      height: 137px;
      width: 137px;
      left: 32px;
      top: 24px;
      border-radius: 100px;
  
  }
  
  .YourHRspocName {
      position: absolute;
      width: auto; /* Change width to "auto" to fit the content in a single line */
      height: 25px;
      left: 45px;
      top: 184px;
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #0C1116;
      font-family: Manrope;
      font-size: 18px;
      font-weight: 600;
      line-height: 25px;
      letter-spacing: 0em;
      text-align: center;
    }
    
    .MainDiv{
      display: flex;
      flex-wrap: wrap;
    }
  
  .YourHRspocRole {
      position: absolute;
      width: 89px;
      height: 16px;
      left: 56px;
      top: 214px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
      font-family: Manrope;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
  
  }
  
  .Colleague {
      position: absolute;
      width: 442px;
      height: 590px;
      left: 1438px;
      top: 520px;
  
      border: 1px solid #D6DADE;
      border-radius: 10px;
      /* for Black Layout */
  }
  
  .ColleagueTitle {
      position: absolute;
      width: 97px;
      height: 27px;
      left: 25px;
      top: 29px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
  }
  
  .ViewAllColleague {
      position: absolute;
      width: 43px;
      height: 16px;
      right: 38px;
      top: 38px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      text-align: right;
      white-space: nowrap;
  
      /* TEXT_COLOR/TEXT-500 */
  
      color: #717D8A;
  }
  
  .ColleagueMembers1 {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 30px;
      top: 97px;
  
      background: url(assets/EmployeeDashboardImages/ColleagueMembers1.svg);
  }
  
  .ColleagueMembers1ID {
      /* 2036 - Somogyi Adrián */
      position: absolute;
      width: 169px;
      height: 22px;
      left: 85px;
      top: 3px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height */
  
  
      /* TEXT_COLOR/TEXT-500 */
  
      color: #717D8A;
      white-space: nowrap;
  }
  
  .ColleagueMembers1Points {
      /* Points : 1587 */
  
  
      position: absolute;
      width: 82px;
      height: 21px;
      left: 295px;
      top: 3px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      /* identical to box height, or 21px */
  
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
  }
  
  .ColleagueMembers1RoleSkillLevel {
      position: absolute;
      width: 169px;
      height: 22px;
      left: 85px;
      top: 30px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      /* identical to box height */
  
  
      /* TEXT_COLOR/TEXT-500 */
  
      color: #717D8A;
  }
  
  .ColleagueMembers1Divider {
      position: absolute;
      width: 383px;
      height: 0px;
      left: 1px;
      top: 100px;
  
      /* TEXT_COLOR/TEXT-300 */
  
      border: 1px solid #D6DADE;
  }
  
  .ColleagueMembers2 {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 30px;
      top: 228px;
  
      background: url(assets/EmployeeDashboardImages/ColleagueMembers2.svg);
  }
  
  .ColleagueMembers2ID {
      /* 2036 - Somogyi Adrián */
      position: absolute;
      width: 169px;
      height: 22px;
      left: 85px;
      top: 6px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #717D8A;
      white-space: nowrap;
  }
  
  .ColleagueMembers2Points {
      position: absolute;
      width: 79px;
      height: 21px;
      left: 290px;
      top: 7px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
       color: #0C1116;
  }
  
  .ColleagueMembers2Divider {
      position: absolute;
      width: 383px;
      height: 0px;
      left: 29px;
      top: 330px;
      border: 1px solid #D6DADE;
  }
  
  .ColleagueMembers3 {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 30px;
      top: 359px;
      background: url(assets/EmployeeDashboardImages/ColleagueMembers3.svg);
  }
  
  .ColleagueMembers3ID {
      position: absolute;
      width: 169px;
      height: 22px;
      left: 85px;
      top: 6px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #717D8A;
      white-space: nowrap;
  }
  
  .ColleagueMembers3Points {
      position: absolute;
      width: 79px;
      height: 21px;
      left: 290px;
      top: 7px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
       color: #0C1116;
  }
  
  .ColleagueMembers3Divider {
      position: absolute;
      width: 383px;
      height: 0px;
      left: 29px;
      top: 460px;
      border: 1px solid #D6DADE;
  }
  
  .ColleagueMembers4 {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 30px;
      top: 489px;
      background: url(assets/EmployeeDashboardImages/ColleagueMembers4.svg);
  }
  
  .ColleagueMembers4ID {
      position: absolute;
      width: 169px;
      height: 22px;
      left: 85px;
      top: 6px;
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #717D8A;
      white-space: nowrap;
  }
  
  .ColleagueMembers4Points {
      position: absolute;
      width: 79px;
      height: 21px;
      left: 290px;
      top: 7px;
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
       color: #0C1116;
  }
  
  .Sidebar {
      position: absolute;
      width: 300px;
      height: 1080px;
      left: 0px;
      top: 0px;
      border: 1px solid black;
      /* for Black Layout */
  }
  
  .Topbar {
      position: absolute;
      width: 1620px;
      height: 114px;
      left: 300px;
      top: 0px;
  
      filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.16));
      border: 1px solid black;
      /* for Black Layout */
  }
  
  .WelcomeGroup {
      position: absolute;
      width: 393px;
      height: 53px;
      left: 330px;
      top: 30px;
  }
  
  .WelcomeTitle {
  
      /* Welcome */
      position: absolute;
      width: 106px;
      height: 33px;
      left: 330px;
      top: 30px;
  
      /* H1 heading/Semibold/24px */
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */
  
  
      /* TEXT_COLOR/TEXT-800 */
  
      color: #242D35;
  
  }
  
  .WelcomeDetails {
      /* View complete details of all location and its corresponding details. */
  
      position: absolute;
      width: 393px;
      height: 18px;
      left: 330px;
      top: 65px;
  
      /* Caption/Regular/13px */
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      /* identical to box height */
  
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
  }
  
  /* default styles */
  
  /* Assuming this is your existing CSS code */
  .AddQuestionsButton {
      box-sizing: border-box;
      position: absolute;
      width: 202px;
      height: 56px;
      left: 1190px;
      top: 157px;
      background: #7BCCED;
      border: 1px solid #7BCCED;
      border-radius: 4px;
      font-family: Manrope;
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: center;
  }
  
  /* New CSS code for the hover effect */
  .AddQuestionsButton:hover {
      background: #6AAFD8; /* Change the background color on hover */
      color: white; /* Change the text color on hover */
      cursor: pointer; /* Change the cursor to a pointer on hover (optional) */
      /* Add any other styles you want to apply when hovering over the button */
  }
  
  
  .AddQuestionsButtonVector_ {
      position: absolute;
      left: 79.09%;
      right: 14.89%;
      top: 47.86%;
      bottom: 39.64%;
      height: 7px;
      width: 12.16085433959961px;
      left: 165.7664794921875px;
      top: 15.7998046875px;
      border-radius: 0px;
  }
  
  
  /* media queries */
  
  @media (max-width: 992px) {
      .AddQuestionsButton {
          /* modify styles for medium devices */
          width: 150px;
          height: 40px;
          font-size: 14px;
      }
  }
  
  @media (max-width: 768px) {
      .AddQuestionsButton {
          /* modify styles for small devices */
          width: 120px;
          height: 32px;
          font-size: 12px;
      }
  }
  
  .ProfilePicture {
      position: absolute;
      width: 84px;
      height: 84px;
      left: 340px;
      top: 162px;
      border-radius: 50%; 
      overflow: hidden; 
    }
    
    .ProfilePicture img {
      width: 100%; 
      height: auto; 
      object-fit: cover;
      margin-top: -15%; 
    }
    
    
  .ProfileName {
      position: absolute;
      width: 224px;
      height: 33px;
      left: 452px;
      top: 165px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      /* identical to box height */
  
      display: flex;
      align-items: center;
  
      /* TEXT_COLOR/TEXT-900 */
  
      color: #0C1116;
  }
  
  .EmployeeID {
      position: absolute;
      width: 33px;
      height: 19px;
      left: 452px;
      top: 204px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      display: flex;
      align-items: center;
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
  }
  
  .EmployeePosition {
      position: absolute;
      width: 110px;
      height: 19px;
      left: 452px;
      top: 224px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      display: flex;
      align-items: center;
      white-space: nowrap;
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
  }
  
  .EmployeeRole {
      position: absolute;
      width: 97px;
      height: 19px;
      left: 500px;
      top: 224px;
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 19px;
      display: flex;
      align-items: center;
  
      /* TEXT_COLOR/TEXT-400 */
  
      color: #A8B0B9;
  }
  
  .Reward1 {
      /* reward 1 */
      position: absolute;
      width: 50px;
      height: 50px;
      left: 960px;
      top: 417px;
  
      background: url(assets/EmployeeDashboardImages/Reward1.svg);
  }
  
  .Reward2 {
      /* reward 2 */
  
      position: absolute;
      width: 50px;
      height: 50px;
      left: 1122px;
      top: 417px;
  
      background: url(assets/EmployeeDashboardImages/Reward2.svg);
  }
  
  .Reward3 {
      /* reward 3 */
  
  
      position: absolute;
      width: 50px;
      height: 50px;
      left: 1283px;
      top: 417px;
  
      background: url(assets/EmployeeDashboardImages/Reward3.svg);
  }
  
  .SkillLevel {
      /* Skill Level: Basic */
  
  
      position: absolute;
      width: 161.63px;
      height: 19px;
      left: 1050px;
      top: 501px;
  
      /* Medium/14px */
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
  
      color: #666565;
      /* styleName: Medium/14px; */
      font-family: Manrope;
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: center;
  
  }
  
  .SkillLevelBasic {
      /* Skill Level: Basic */
  
  
      position: absolute;
      width: 161.63px;
      height: 19px;
      left: 1105px;
      top: 501px;
  
      /* Medium/14px */
  
      font-family: 'Manrope';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
  
      color: #000000;
      /* styleName: Medium/14px; */
      font-family: Manrope;
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: center;
  }
  
  .SkillLevelBar {
      position: absolute;
      width: 373px;
      height: 6px;
      left: 960px;
      top: 536px;
  
      /* PRIMARY_BLUE/PRI-2-50 */
  
      background: #DFF3FB;
      border-radius: 30px;
      height: 6px;
      width: 373px;
      left: 960px;
      top: 536px;
      border-radius: 30px;
  }
  
  .ReportingManagerProfilePicture {
      /* Frame 427318746 */
      box-sizing: border-box;
      position: absolute;
      width: 137px;
      height: 137px;
      left: 32px;
      top: 24px;
      background: url(assets/EmployeeDashboardImages/ReportingManagerPic.svg);
      border-radius: 100px;
  }
  
  .Sidebar{
      position: absolute;
  width: 300px;
  height: 1080px;
  left: 0px;
  top: 0px;
  background: linear-gradient(179.54deg, #AFE0F4 5.55%, #E1EEC8 194.36%);
  }
  .kaninilogo { 
      width:93px;
      height:47px;
      position:absolute;
      left:123px;
      top:50px;
  }
  .kaninilogo1 { 
      color:rgba(12.000000234693289, 17.00000088661909, 22.000000588595867, 1);
      width:93px;
      height:33px;
      position:absolute;
      left:0px;
      top:0px;
      font-family:Roboto;
      text-align:left;
      font-size:28px;
      letter-spacing:10;
  }
  .kaninilogo2 { 
      color:rgba(55.17031118273735, 63.178905844688416, 71.18750050663948, 1);
      width:93px;
      height:19px;
      position:absolute;
      left:0px;
      top:28px;
      font-family:Manrope;
      text-align:left;
      font-size:14px;
      letter-spacing:9;
  }
  .kaninilogo3 { 
      width:47px;
      height:47px;
      position:absolute;
      left:50px;
      top:50px;
      background-repeat:no-repeat;
      background-size:cover;
      background-image: url(assets/Sidebar/kaninilogo.svg);
  }
  .dashboard { 
      position:absolute;
      left:83px;
      top:155px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .dashboard1 { 
      position:absolute;
      left:45px;
      top:154px;
      right:237px;
      bottom:905px;
      background-image: url(assets/Sidebar/das.svg);
  }
  .Takeass { 
      position:absolute;
      left:83px;
      top: 238px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .Takeass1 { 
      position:absolute;
      left:45px;
      top:239px;
      right:237px;
      bottom:824.39px;
      background-image: url(assets/Sidebar/takeass.svg);
  }
  .Allocateass { 
      position:absolute;
      left:83px;
      top: 320px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .Allocateass1 { 
      position:absolute;
      left:45px;
      top:321px;
      right:240px;
      bottom:741px;
      background-image: url(assets/Sidebar/allocateass.svg);
  }
  .Result { 
      position:absolute;
      left:83px;
      top: 404px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  }
  .Result1_ { 
      position:absolute;
      left:45px;
      top:406px;
      right:240px;
      bottom: 656px;
      background-image: url(assets/Sidebar/result.svg);
  }
  .teammem{
      position:absolute;
      left:83px;
      top: 487px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  
  }
  .teammem1{
      position:absolute;
      left:45px;
      top:491px;
      right: 235px;
      bottom: 574.95px;
  
  }
  .Settings{
      position:absolute;
      left:83px;
      top: 467px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  
  }
  .Settings1_{
      position:absolute;
      left:45px;
      top:467px;
      right: 237px;
      bottom: 491.38px;
      background-image: url(assets/Sidebar/setting.svg);
  
  }
  .Logout{
      position:absolute;
      left:85px;
      top: 991px;
      font-family:Manrope;
      text-align:left;
      font-size:16px;
      letter-spacing:0;
      cursor: pointer;
  
  }
  .Logout1{
      position:absolute;
      left:45px;
      top:991px;
      right: 242.55px;
      bottom: 69px;
      background-image: url(assets/Sidebar/logout.svg);
  
  }
  .Navbar{
      position: absolute;
  width: 1620px;
  height: 114px;
  left: 300px;
  top: 0px;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.16));
  background: linear-gradient(138.51deg, rgba(223, 243, 251, 0.3) 59.84%, rgba(225, 238, 200, 0.3) 116.14%);
  }
  .rr{
  position: absolute;
  left: 30px;
  top: 30px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #242D35;
  }
  .rr1{
  position: absolute;
  left: 30px;
  top: 65px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #A8B0B9;
  }
  #search{
  box-sizing: border-box;
  width: 386px; 
  height: 40px;
  position: absolute;
  border: 1px solid #A8B0B9;
  border-radius: 8px;
  left: 888px;
  top: 37px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.2px;
  color: #A8B0B9;
  mix-blend-mode: normal;
  text-align: left;
  text-indent: 38px;
  }
  .bell{   
  position: absolute;
  right: 284px;
  cursor: pointer;
  }
  .subra{
      
  position: absolute;
  left: 1368px;
  top: 33px;
  }
  .subra1{
      position: absolute;
  left: 1430px;
  top: 44px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #242D35;
  }
  
  .navbarNew{
      position: absolute;
  left: 55.62%;
  right: 0%;
  top: 0%;
  bottom: 89.44%;
  
  background: linear-gradient(138.51deg, #F8FDFF 59.84%, #F6FAEF 116.14%);
  }
  
  .headingNew{
      position: absolute;
  width: 173px;
  height: 33px;
  left: 340px;
  top: 31px;
  
  /* H1 heading/Semibold/24px */
  
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  /* identical to box height */
  
  
  /* TEXT_COLOR/TEXT-800 */
  
  color: #242D35;
  
  }
  .subheadingNew{
      position: absolute;
  width: 336px;
  height: 18px;
  left: 345px;
  top: 71px;
  
  /* Caption/Regular/13px */
  
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */
  
  
  /* TEXT_COLOR/TEXT-400 */
  
  color: #A8B0B9;
  }
  /* ... (existing styles) ... */
  
  
  .klogonew {
      position: absolute;
      width: 48px;
      height: 48px;
      left: 1623px;
      top: 25px;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .klogonew img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
  .navname{
      /* Subramaniyam */
  
  position: absolute;
  width: 126px;
  height: 25px;
  left: 1675px;
  top: 35px;
  
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */
  
  /* TEXT_COLOR/TEXT-800 */
  color: #242D35;
  
  
  }
  
  /* Apply styles to the tboxnew container */
  .tboxnew {
    position: absolute;
    width: 386px;
    height: 40px;
    left: 1213px;
    top: 38px;
  }
  
  /* Apply styles to the input field */
  .senew {
    box-sizing: border-box;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: #FFFFFF;
    /* TEXT_COLOR/TEXT-300 */
    border: 0.8px solid #D6DADE;
    border-radius: 4.8px;
    padding-left: 50px !important;
    outline: none;
    width: 200px; /* Update this to the desired width */
  }
  .searchiconnew{
   width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 350px;
      transform: translateY(-50%);
  }

  .MainDiv{
    overflow-x: hidden;
  }

  `}
      </style>
      <div style={{ overflowX: 'hidden' }} className='MainDiv'>
        <div style={{ overflowX: 'hidden' }} className='fullbody'>
          <div className="Overview"></div>
          <div className="OverviewTitle">Overview</div>

          <div className="OngoingAssessed"></div>
          <div className="OngoingAssessedSVG">
          </div>
          <div className="OngoingAssessedText">Ongoing Assessed</div>
          <div className="NumberOfOngoingAssessed">3</div>

          <div className="CompletedAssessed"></div>
          <div className="CompletedAssessedSVG">
          </div>
          <div className="CompletedAssessedText">Completed Assessed</div>
          <div className="NumberOfCompletedAssessed"></div>

          <div className="PointsEarned"></div>
          <div className="PointsEarnedSVG">
          </div>
          <div className="PointsEarnedText">Points Earned</div>
          <div className="NumberOfPointsEarned">{totalPoints}</div>

          <div className="BadgesEarnedTitle">Badge Earned</div>
          <div className="BadgesEarned"></div>
          <div className="Reward1"></div>
          <div className="Reward2"></div>
          <div className="Reward3"></div>

          <div className="SkillLevel">Skill Level:</div>
          <div className="SkillLevelBasic">
            <b>Basic</b>
          </div>
          <div className="SkillLevelBar"></div>

          <div className="QuickAccess">Quick Access</div>
          <div className="QuickaccessAssessment">
            <div className="Assessments">
              Assessments
              <div className="NumberOfAssessment">2 new assessment received</div>
            </div>
            <div className="NumberOfAssessmentArrow">
            </div>
          </div>
          <div className="AssessmentsLogoEllipse">
            <div className="AssessmentsLogoEllipseVector" style={{ backgroundImage: `url(${AssessmentsBulb})` }}></div>

          </div>

          <div className="QuickaccessAssessmentResult">
            <div className="AssessmentsResultLogoEllipse">
              <div className="AssessmentsResultLogoEllipseVector">
              </div>
            </div>
            <div className="AssessmentsResultLogoEllipseArrow">
              <img src="assets/EmployeeDashboardImages/AssessmentArrow.svg" alt="" />
            </div>
            <div className="AssessmentResultQuickAccess">Assessment Result</div>
            <div className="NumberOfAssessmentResult">3 new results have been generated</div>
          </div>

          <div className="ReportingManagerTitle">Reporting Manager</div>
          <div className="ReportingManagerProfile">
            {swaggerData.length >= 6 && (
              <>
                <div className="ReportingManagerProfilePicture">
                  <img src="assets/EmployeeDashboardImages/ReportingManagerPic.svg" alt="" />
                </div>
                <div className="ReportingManagerName">{`${swaggerData[5].user_FirstName} ${swaggerData[5].user_LastName}`}</div>
                <div className="ReportingManagerRole">{`${swaggerData[5].user_ID} - ${swaggerData[5].user_Designation}`}</div>
              </>
            )}
          </div>

          <div className="YourHRspocTitle">Your HR-spoc</div>
          <div className="YourHRspocProfile">
            {swaggerData.length >= 6 && (
              <>
                <div className="YourHRspocProfilePicture"></div>
                <div className="YourHRspocName">{`${swaggerData[4].user_FirstName} ${swaggerData[4].user_LastName}`}</div>
                <div className="YourHRspocRole">{`${swaggerData[4].user_ID} - ${swaggerData[4].user_Designation}`}</div>
              </>
            )}
          </div>

          <div className="Colleague">
            <div className="ColleagueTitle">Colleague</div>
            <div className="ViewAllColleague">View All</div>
            <div className="ColleagueMembers">
              {swaggerData.length >= 4 && (
                <>
                  <div className="ColleagueMembers1">
                    <div className="ColleagueMembers1ID">{`${swaggerData[0].user_ID} - ${swaggerData[0].user_FirstName} ${swaggerData[0].user_LastName}`}</div>
                    <div className="ColleagueMembers1Points">Points: {`${swaggerData[0].totalPoints}`}</div>
                    <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[0].user_Designation} | ${swaggerData[0].user_Departmenr} | ${swaggerData[0].user_Location}`}</div>
                    <div className="ColleagueMembers1Divider"></div>
                  </div>
                  <div className="ColleagueMembers2">
                    <div className="ColleagueMembers2ID">{`${swaggerData[1].user_ID} - ${swaggerData[1].user_FirstName} ${swaggerData[1].user_LastName}`}</div>
                    <div className="ColleagueMembers1Points">Points: {`${swaggerData[1].totalPoints}`}</div>
                    <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[1].user_Designation} | ${swaggerData[1].user_Departmenr} | ${swaggerData[1].user_Location}`}</div>
                  </div>
                  <div className="ColleagueMembers2Divider"></div>

                  <div className="ColleagueMembers3">
                    <div className="ColleagueMembers3ID">{`${swaggerData[2].user_ID} - ${swaggerData[2].user_FirstName} ${swaggerData[2].user_LastName}`}</div>
                    <div className="ColleagueMembers1Points">Points: {`${swaggerData[2].totalPoints}`} </div>
                    <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[2].user_Designation} | ${swaggerData[2].user_Departmenr} | ${swaggerData[2].user_Location}`}</div>
                  </div>
                  <div className="ColleagueMembers3Divider"></div>

                  <div className="ColleagueMembers4">
                    <div className="ColleagueMembers4ID">{`${swaggerData[3].user_ID} - ${swaggerData[3].user_FirstName} ${swaggerData[3].user_LastName}`}</div>
                    <div className="ColleagueMembers1Points">Points: {`${swaggerData[3].totalPoints}`}</div>
                    <div className="ColleagueMembers1RoleSkillLevel">{`${swaggerData[3].user_Designation} | ${swaggerData[3].user_Departmenr} | ${swaggerData[3].user_Location}`}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="SidebarNew">
            <div className="kaninilogo">
              <span className="kaninilogo1New">Kanini</span>
              <span className="kaninilogo2New">Assessment</span>
            </div>
            <div className="kaninilogo3New">
              <img src={kaninilogo} alt="" />
            </div>
            <div>
              <Link to="/Dashboard" className={getButtonClassName('/dashboard')}>
                <span className="dashboardNew">Dashboard</span>
                <div className="dashboard1New">
                  <img src={das} alt="" />
                </div>
              </Link>
              <Link to="/take-assessment" className={getButtonClassName('/take-assessment')}>
                <span className="TakeassNew">Take Assessment</span>
                <div className="Takeass1New">
                  <img src={takeass} alt="" />
                </div>
              </Link>
              <Link to="/AllocatedAssessment" className={getButtonClassName('/allocated-assessment')}>
                <span className="AllocateassNew">Allocated Assessment</span>
                <div className="Allocateass1New">
                  <img src={allocateass} alt="" />
                </div>
              </Link>
              <Link to="/result" className={getButtonClassName('/result')}>
                <span className="ResultNew">Result</span>
                <div className="Result1New">
                  <img src={result} alt="" />
                </div>
              </Link>
              <Link to="/TeamMembersCard" className={getButtonClassName('/team-members')}>
                <span className="teammemNew">Team Members</span>
                <div className="Team1New">
                  <img src={team1} alt="" />
                </div>
              </Link>
              <Link to="/Settings" className={getButtonClassName('/settings')}>
                <span className="SettingsNew">Settings</span>
                <div className="Settings1New">
                  <img src={setting} alt="" />
                </div>
              </Link>
              <Link to="/logout" className={getButtonClassName('/logout')}>
                <span className="LogoutNew">Logout</span>
                <div className="Logout1New">
                  <img src={logout} alt="" />
                </div>
              </Link>
              <div className="rectangleNew"></div>
            </div>
            <div className="SidebarNew">
              <div className="kaninilogo">
                <span className="kaninilogo1New">Kanini</span>
                <span className="kaninilogo2New">Assessment</span>
              </div>
              <div className="kaninilogo3New">
                <img src={kaninilogo} alt="" />
              </div>
              <div>
                <Link to="/Dashboard" className={getButtonClassName('/dashboard')}>
                  <span className="dashboardNew">Dashboard</span>
                  <div className="dashboard1New">
                    <img src={das} alt="" />
                  </div>
                </Link>
                <Link to="/take-assessment" className={getButtonClassName('/take-assessment')}>
                  <span className="TakeassNew">Take Assessment</span>
                  <div className="Takeass1New">
                    <img src={takeass} alt="" />
                  </div>
                </Link>
                <Link to="/AllocatedAssessment" className={getButtonClassName('/allocated-assessment')}>
                  <span className="AllocateassNew">Allocated Assessment</span>
                  <div className="Allocateass1New">
                    <img src={allocateass} alt="" />
                  </div>
                </Link>
                <Link to="/result" className={getButtonClassName('/result')}>
                  <span className="ResultNew">Result</span>
                  <div className="Result1New">
                    <img src={result} alt="" />
                  </div>
                </Link>
                <Link to="/TeamMembersCard" className={getButtonClassName('/team-members')}>
                  <span className="teammemNew">Team Members</span>
                  <div className="Team1New">
                    <img src={team1} alt="" />
                  </div>
                </Link>
                <Link to="/Settings" className={getButtonClassName('/settings')}>
                  <span className="SettingsNew">Settings</span>
                  <div className="Settings1New">
                    <img src={setting} alt="" />
                  </div>
                </Link>
                <Link to="/logout" className={getButtonClassName('/logout')}>
                  <span className="LogoutNew">Logout</span>
                  <div className="Logout1New">
                    <img src={logout} alt="" />
                  </div>
                </Link>
                <div className="rectangleNew"></div>
              </div>
            </div>
            <div className="Topbar"></div>

            <div className="WelcomeTitle">Welcome</div>
            <div className="WelcomeDetails">
              View complete details of all locations and their corresponding details.
            </div>

            <button className="AddQuestionsButton">
              <div className="AddQuestionsText">Add Questions</div>
              <div className="AddQuestionsButtonVector_">
                <img src="assets/EmployeeDashboardImages/AddQuestions.svg" alt="" />
              </div>
            </button>

            <div className="EmployeeProfile">
              <div className="ProfilePicture">
                {userImageURL && (
                  <img
                    src={userImageURL}
                    alt="User Profile"
                  />
                )}
              </div>
              <div className="ProfileName">
                {profileData && profileData[0].user_FirstName}  {profileData && profileData[0].user_LastName}
              </div>
              <div className="EmployeeID"> {profileData && profileData[0].user_ID}</div>
              <div className="EmployeePosition"> {profileData && profileData[0].user_Departmenr}</div>
              <div className="EmployeeRole">{profileData && profileData[0].user_Designation}</div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
