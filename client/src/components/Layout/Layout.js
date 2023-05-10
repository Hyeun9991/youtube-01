import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import styled from 'styled-components';

function Layout(props) {
  return (
    <div>
      <Navbar />

      <ContentContainer>{props.children}</ContentContainer>

      <Footer />
    </div>
  );
}

const ContentContainer = styled.main`
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  margin-top: 70px;
  padding: 1rem;
`


export default Layout;
