interface Props {
  text: string;
}

export default function Message({ text }: Props) {
  return <h2 className='text-xs md:text-2xl font-light text-bw-black-200 mr-3'>{text}</h2>;
}
