import type { NextPage } from 'next'
import { ConferenceLayout } from '../components/conference.layout';

type Props = {
    roomId: string
}

const Conference: NextPage<Props> = () => {
  return (
    <ConferenceLayout/>
  );
}

export default Conference
