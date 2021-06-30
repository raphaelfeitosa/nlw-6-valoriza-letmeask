import styled from 'styled-components';

export const ContainerHome = styled.div`

@keyframes asideAnimation {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes contentAnimation {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    50% {
      opacity: 0.85;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes mainAnimation {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
      flex: 7;
      background-color: ${props => props.theme.colors.primary};
      color: #FFF;
      display: flex;
      flex-direction: column;
      justify-content: center;

      animation: asideAnimation 3s;
      /* padding: 12rem 8rem; */
      padding: 120px 80px;

      img {
          /* max-width: 32rem; */
          max-width: 320px;
          animation: contentAnimation 3s;
      }

      strong {
        font: 700 2rem 'Poppins', sans-serif;
          line-height: 1.5rem;
          margin-top: 1rem;
          
          /* font: 700 3.6rem "Poppins", sans-serif;
            line-height: 4rem;
            margin-top: 1rem; */
            animation: contentAnimation 3s;
      }
      p {
          /* font-size: 1.2rem; */
          /* line-height: 2rem;
          margin-top: 1rem;
          color: #f8f8f8; */

          font-size: 1.2rem;
            line-height: 2rem;
            margin-top: 1rem;
            color: #f8f8f8;
            animation: contentAnimation 3s;
      }

      @media (max-width: 768px) {
        width: 30%;           
      }
  
      @media (max-width: 700px) {
        display: none;
      }
    }

  main {
    flex: 8;
    /* background-color: #FFF; */
    padding: 0 3.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  align-items: stretch;
  text-align: center;

  animation: mainAnimation 3s;


  > div {
        display: flex;
        justify-content: left;
        align-items: stretch;
        gap: 10px;

        button {
          height: 40px;
          background-color: transparent;
          color: ${(props) => props.theme.colors.white.light};
        }
    }

  > img {
    align-self: center;
    max-width: 250px;
  }
            
  form {
      /* box-sizing: border-box; */
    input {
      height: 2.5rem;
      border-radius: 8px;
      padding: 0 2.5rem;
      background-color: #fff;
      border: 1px solid ${(props) => props.theme.colors.primary};
    }
    button {
      margin-top: 0.5rem;
    }
    button,
    input {
      height: 2.5rem;
      width: 100%;
    }
  }
  .create-room-google {
    margin-top: 2.5rem;
    height: 2.5rem;
    border-radius: 8px;
    font-weight: 500;
    background-color: #ea4335;
    color: #FFF;
    
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    transition: ease all 0.3s;
    img {
        margin-right: 8px;
    }
    &:hover {
        filter: brightness(0.9);
    }
  }
  .separator {
    font-size: 20px;
    color: #a8a8b3;
    margin: 30px 0 10px;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      flex: 1;
      height: 1px;
      background-color: #a8a8b3;
      margin-right: 16px;
    }
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background-color: #a8a8b3;
      margin-left: 16px;
    }
  }
`;