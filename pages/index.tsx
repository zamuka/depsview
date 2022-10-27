import type { NextPage } from 'next'
import Head from 'next/head'
import { ConfigProvider } from '../shared/store/ConfigContextProvider';
import { MainPageContent } from '../shared/components/MainPageContent';
interface HomeProps {
  packet: Packet;
}

const Home: NextPage<HomeProps> = (props) => {

  return (
    <ConfigProvider>
      <Head>
        <title>Dependency Viewer</title>
        <meta name="description" content="Packets dependency viewier" />
      </Head>
      <MainPageContent/>
    </ConfigProvider>
  )
}

export default Home;
