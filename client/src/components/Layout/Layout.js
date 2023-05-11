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
  height: auto;
  margin: 0 auto;
  margin-top: 56px;
`


export default Layout;
