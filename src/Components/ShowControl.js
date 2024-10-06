import React from 'react';
import styled from 'styled-components';
import csv from 'csvtojson';
import config from 'config.json';

const Container = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
`
const StyledButton = styled.div`
  cursor: pointer;
  color: white;
  background: maroon;
  padding: 5px;
  border-radius: 5px;
  font-size: 15px;
`

function ShowControl(props) {
  const { showControl, setShowControl } = props;

  const toggleShow = React.useCallback(() => {
    setShowControl(showControl => !showControl) 
  }, [setShowControl])

  return (
    <Container>
      <StyledButton onClick={toggleShow}>
        {showControl ? 'Hide Control':'Show Control'}
      </StyledButton>
    </Container>
  )
}

export default React.memo(ShowControl);