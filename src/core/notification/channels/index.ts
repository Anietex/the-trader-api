import Email from '@/core/notification/channels/Email';
import InApp from '@/core/notification/channels/InApp';
import SMS from '@/core/notification/channels/SMS';
import Channel from '@/core/notification/channels/Channel';

interface ChannelsMap{
  [key: string]: Channel
}

const channelMap: ChannelsMap = {
  sms: new SMS(),
  email: new Email(),
  in_app: new InApp(),
};

export default channelMap;
