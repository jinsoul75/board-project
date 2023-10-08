import { FRONTEND } from '@/util/constants';

export default function Category(props: { categoryName: string }) {
  return (
    <div
      className={`font-bold mb-0.5 ${
        props.categoryName === FRONTEND ? 'text-orange-600' : 'text-emerald-600'
      }`}
    >
      {props.categoryName}
    </div>
  );
}
