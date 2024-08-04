import { Checkbox } from '~/components/ui/checkbox'

const reports = [
  {
    title: 'Misinformation',
    message:
      "Posts or comments that provide false or misleading information about health, wellness, or dieting. This includes incorrect medical advice, unverified claims about products, or spreading myths that could harm users' health",
  },
  {
    title: 'Spam or Advertising',
    message:
      "Posts or comments that are promotional in nature, including unsolicited advertisements for products, services, or websites. This also covers content that is irrelevant to the platform's focus on health, wellness, and dieting",
  },
  {
    title: 'Inappropriate Content',
    message:
      'Content that is offensive, abusive, or harassing. This includes hate speech, bullying, personal attacks, or derogatory language towards individuals or groups based on race, gender, sexual orientation, or other protected characteristics',
  },
  {
    title: 'Privacy Violation',
    message:
      "Content that discloses personal information about other users without their consent. This includes sharing private messages, contact information, or other sensitive data that could compromise someone's privacy",
  },
  {
    title: 'Harmful Behavior',
    message:
      " Posts or comments that encourage or glorify dangerous behaviors, such as self-harm, eating disorders, or substance abuse. This category also includes content that suggests unsafe dieting practices or extreme measures that could negatively impact one's health",
  },
  {
    title: 'Off-Topic Content',
    message:
      "Posts or comments that are not relevant to the topic of health, wellness, or dieting. This includes discussions that do not contribute to the community's goals or objectives and may detract from the focus of the platform",
  },
  {
    title: 'Graphic or Inappropriate Images',
    message:
      'Images or videos that are graphic, violent, or sexually explicit. This category also includes content that may be disturbing or unsuitable for all audiences, such as images of extreme weight loss or medical procedures',
  },
  {
    title: 'Impersonation or Fake Accounts',
    message:
      "Accounts or posts that misrepresent the identity of another individual, including the use of someone else's name, likeness, or credentials without permission. This also includes the creation of fake accounts for deceptive purposes",
  },
]

export default function ReportChat() {
  return (
    <section className="mt-8 pb-14 font-montserrat">
      <div className="max-w-[751px] pb-[55px]">
        <p className="font-medium text-[#4D5061]">
          To help us maintain a positive and supportive community, please select the reason why you
          are reporting this post or comment
        </p>
        <p className="ml-4 mt-[40px] font-semibold text-[#4D5061]">
          Indicate the type of issue you’re reporting{' '}
          <span className="font-normal">( Select one or more that applies)</span>
        </p>

        <div className="mt-3 flex flex-col gap-[28px]">
          {reports.map((report) => (
            <div className="rounded-[20px] border border-[#D0D5DD99] p-[18px]">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#667085]">{report.title}</h3>
                <Checkbox className="h-[20px] w-[20px] rounded-full" />
              </div>
              <p className="mt-3 max-w-[669px] text-[#4D5061]">{report.message}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[813px] border-t border-[#D0D5DD] pt-[55px]">
        <p className="mb-6 font-semibold text-[#4D5061]">Any Additional Comments?</p>
        <textarea
          placeholder="Enter your comments here"
          className="h-[108px] w-full max-w-[751px] resize-none rounded-[20px] border px-[15px] py-[19px]"
        ></textarea>
        <button className="mt-14 w-[286px] rounded-primary bg-primary py-4 font-raleway font-bold text-white">
          Continue
        </button>
      </div>
    </section>
  )
}
