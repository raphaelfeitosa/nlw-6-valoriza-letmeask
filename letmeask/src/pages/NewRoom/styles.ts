import styled from 'styled-components';

export const ContainerNewRoom = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
  aside {
    flex: 7;
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 80px;

    img {
      max-width: 320px;
    }

    strong {
      font: 700 2rem "Poppins", sans-serif;
      line-height: 1.5rem;
      margin-top: 1rem;
    }
    p {
      font-size: 1.2rem;
      line-height: 2rem;
      margin-top: 1rem;
      color: #f8f8f8;
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
     background-color: ${(props) => props.theme.colors.white};
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

  .user-perfil-login {
      /* background: #FFF; */
      display: flex;
       /* justify-content: space-between; */
      align-items: center;
      padding: 5px;
      margin-top: 30px;
      border-radius: 10px;
      font-family: 'Poppins', sans-serif;

      img {
        border-radius: 50%;
        width: 40px;
      }

      .user-login {
        margin-left: 8px;
        font-size: 7px;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: nowrap;
      }
    }

    .user-perfil-logout {
      /* background: #FFF; */
      display: flex;
       /* justify-content: space-between; */
      align-items: center;
      padding: 5px;
      border-radius: 10px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;

      img {
        border-radius: 50%;
        width: 40px;
      }

      .user-logout {
        margin-left: 8px;
        font-size: 7px;
        font-weight: 500; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start; 
        flex-wrap: nowrap; 
      }
    }

   h2 {
      font-size: 20px;
      margin: 30px 0 15px;
      font-family: 'Poppins', sans-serif;
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

      button, input {
        height: 2.5rem;
        width: 100%;
      }
    }
    p {
      font-size: 15px;
      color: #737380;
      margin-top: 16px;

      a {
        color: #e559f9
      }
    }
`;