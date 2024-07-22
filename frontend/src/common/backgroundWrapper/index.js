import styled from 'styled-components';

const BackgroundWrapperComponent = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #F3F6F9;
`

function BackgroundWrapper({children}) {
    return (
      <BackgroundWrapperComponent>
        {children}    
      </BackgroundWrapperComponent>
    );
  }
  
  export default BackgroundWrapper;