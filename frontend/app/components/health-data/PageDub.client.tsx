import AgoraRTC, {
  AgoraRTCProvider,
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from 'agora-rtc-react'
import { CameraOff, Mic } from 'lucide-react'
import { useEffect, useState } from 'react'
import { VideoBoxData } from '~/routes/_dashboard.health-care-providers.video.$videoId'
import { Camera, Chat, Mute } from '../shared/icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import VideoChat from './VideoChat'

export const PageDub = ({ data, isDoctor }: { data: VideoBoxData; isDoctor?: boolean }) => {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
  return (
    <AgoraRTCProvider client={client}>
      <Basics isDoctor={isDoctor} data={data} />
    </AgoraRTCProvider>
  )
}

const Basics = ({ data, isDoctor }: { data: VideoBoxData; isDoctor?: boolean }) => {
  const [calling, setCalling] = useState(false)
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
      <div className="mt-16 rounded-[20px] border">
        <div className="border-b p-6 font-montserrat lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 font-semibold text-[#333]">
            <Chat />
            <h2 className="text-lg">
              Chat with {isDoctor ? appointment.user.full_name : appointment.doctor.name}
            </h2>
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
          </div>
        </div>
        <div className="lg:flex">
          <div className="p-6 lg:flex-[2]">
            <div className="relative flex h-[503px] items-center justify-center overflow-hidden rounded-[16px] bg-[#4D5061]">
              {remoteUsers[0] ? (
                <RemoteUser cover={appointment.doctor.profile} user={remoteUsers[0]}>
                  <samp className="absolute bottom-2 left-3 font-montserrat text-xs text-white">
                    {isDoctor ? appointment.user.full_name : appointment.doctor.name}
                  </samp>
                </RemoteUser>
              ) : (
                <Avatar className="h-[150px] w-[150px] border-4 border-white">
                  <AvatarImage
                    src={isDoctor ? 'https://github.com/shadcn.png' : appointment.doctor.profile}
                    className="object-cover"
                  />
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

          <VideoChat
            app_id={data.appId}
            channel={data.channel}
            token={data.rtmToken}
            user_id={data.username.toString()}
          />
        </div>
      </div>
    </>
  )
}
