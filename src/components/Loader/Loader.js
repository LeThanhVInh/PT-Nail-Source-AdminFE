import ScaleLoader from 'react-spinners/ScaleLoader';
import './Loader.scss';

export default function Loader(props) {
  const {
    colorLoader = '#fff',
    isLoading = true,
    hasBackground = true,
    size = 100,
  } = props;

  return (
    <div className={hasBackground ? 'sweet-loading' : 'sweet-loading no-bg'}>
      <ScaleLoader
        color={colorLoader}
        loading={isLoading}
        size={size}
        speedMultiplier={3}
        aria-label="Loading"
        data-testid="loader"
      />
    </div>
  );
}
