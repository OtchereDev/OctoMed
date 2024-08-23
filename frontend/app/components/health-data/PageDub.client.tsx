import AgoraRTC, {
  AgoraRTCProvider,
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from 'agora-rtc-react'
import { CameraOff, Mic, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { VideoBoxData } from '~/routes/channel.$channelId'
import { Camera, Chat, Mute } from '../shared/icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const PageDub = ({ data }: { data: VideoBoxData }) => {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
  return (
    <AgoraRTCProvider client={client}>
      <Basics data={data} />
    </AgoraRTCProvider>
  )
}

const Basics = ({ data }: { data: VideoBoxData }) => {
  const [calling, setCalling] = useState(false)
  const isConnected = useIsConnected() // Store the user's connection status
  const { appointment } = data
  useJoin(
    {
      appid: data.appId,
      channel: data.channel,
      token: data.rtcToken,
    },
    calling
  )

  const [micOn, setMic] = useState(true)
  const [cameraOn, setCamera] = useState(true)
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn)
  const { localCameraTrack } = useLocalCameraTrack(cameraOn)
  usePublish([localMicrophoneTrack, localCameraTrack])

  const remoteUsers = useRemoteUsers()

  useEffect(() => {
    setCalling(true)
  }, [])

  return (
    <>
      {/* <div className="room">
        {
          <div className="user-list">
         
            {remoteUsers.map((user) => (
              <div className="user h-[200px] w-[200px]" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        }
      </div>

      <div className="control">
        <button
          className={`btn btn-phone ${calling ? 'btn-phone-active' : ''}`}
          onClick={() => setCalling((a) => !a)}
        >
          {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
        </button>
      </div> */}

      <div className="mt-16 rounded-[20px] border">
        <div className="border-b p-6 font-montserrat lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 font-semibold text-[#333]">
            <Chat />
            <h2 className="text-lg">Chat with {appointment.doctor.name}</h2>
          </div>
          <div className="mt-4 flex items-center gap-3 font-raleway lg:mt-0">
            <button
              onClick={() => setMic((a) => !a)}
              className="flex gap-2 rounded-[8px] border-[#09AEF21A] bg-[#DCECF4] px-[18px] py-[10px] font-semibold text-primary"
            >
              {micOn ? <Mute /> : <Mic />}
              {micOn ? 'Mute' : 'Unmute'}
            </button>
            <button
              onClick={() => setCamera((a) => !a)}
              className="flex items-center gap-2 rounded-[8px] border-[#09AEF21A] bg-[#DCECF4] px-[18px] py-[10px] text-sm font-semibold text-primary"
            >
              {cameraOn ? <CameraOff /> : <Camera />}
              Camera {cameraOn ? 'off' : 'on'}
            </button>
            {/* <button className="flex gap-2 rounded-[8px] border-[#09AEF21A] bg-[#DCECF4] p-[12px] font-semibold text-primary">
              <FullscreenIcon />
            </button> */}
          </div>
        </div>
        <div className="lg:flex">
          <div className="p-6 lg:flex-[2]">
            <div className="relative flex h-[503px] items-center justify-center overflow-hidden rounded-[16px] bg-[#4D5061]">
              {remoteUsers[0] ? (
                <RemoteUser cover={appointment.doctor.profile} user={remoteUsers[0]}>
                  <samp className="absolute bottom-2 left-3 font-montserrat text-xs text-white">
                    {appointment.doctor.name}
                  </samp>
                </RemoteUser>
              ) : (
                <Avatar className="h-[150px] w-[150px] border-4 border-white">
                  <AvatarImage src={appointment.doctor.profile} className="object-cover" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}

              <div className="absolute bottom-4 right-4 z-10 flex h-[96px] w-[150px] items-center justify-center overflow-hidden rounded-[10px] border-2">
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                  cover="https://github.com/shadcn.png"
                >
                  <samp className="absolute bottom-2 left-3 font-montserrat text-xs text-white">
                    You
                  </samp>
                </LocalUser>
              </div>
            </div>
          </div>
          <div className="border-t p-6 lg:flex-1 lg:border-l lg:border-t-0">
            <div className="flex h-[503px] flex-col font-montserrat">
              <div className="flex flex-1 flex-col gap-3 overflow-scroll">
                <div className="max-w-[284px] rounded-[12px] rounded-bl-none bg-[#D0D5DD4D] px-4 py-[14px] text-sm">
                  <p>Hello. I’m Daniel. How may I help you today?</p>
                </div>
                <div className="ml-auto max-w-[284px] rounded-[12px] rounded-br-none bg-[#F5CB5C] px-4 py-[14px] text-sm">
                  <p>
                    I've been struggling with anxiety, especially during my workouts. What
                    strategies or techniques do you use to manage anxiety w...
                  </p>
                </div>
              </div>
              <div className="flex gap-4 border-t pt-4">
                <input
                  placeholder="Enter your message here"
                  className="flex-1 rounded-[8px] border px-[14px] py-[10px] outline-none"
                />
                <button className="rounded-[8px] bg-primary p-3 text-white">
                  <Send />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
