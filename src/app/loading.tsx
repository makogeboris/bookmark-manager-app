export default function LoadingPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-10">
      <div className="relative flex items-center justify-center">
        <span
          className="absolute rounded-full"
          style={{
            width: 96,
            height: 96,
            border: "1.5px solid hsl(178 97% 14% / 0.15)",
            animation: "ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite",
            animationDelay: "0ms",
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            width: 72,
            height: 72,
            border: "1.5px solid hsl(178 97% 14% / 0.25)",
            animation: "ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite",
            animationDelay: "300ms",
          }}
        />
        <span
          className="absolute rounded-full"
          style={{
            width: 52,
            height: 52,
            border: "1.5px solid hsl(178 97% 14% / 0.4)",
            animation: "ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite",
            animationDelay: "600ms",
          }}
        />

        <div
          className="relative z-10"
          style={{ animation: "breathe 2.4s ease-in-out infinite" }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7" y="5" width="18" height="23" fill="white" />
            <path
              d="M11.7354 11.7565C11.7354 11.3151 11.7354 10.3944 13.7488 10.3944H18.2453C20.2571 10.3944 20.2571 11.3282 20.2571 11.8878L20.2604 21.2039L16.6239 19.1477C16.2498 18.936 15.7919 18.936 15.4178 19.146L11.7354 21.2104V11.7565Z"
              fill="#014745"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.9185 31.5898H9.07805C3.89241 31.5898 0.410156 27.945 0.410156 22.5215V9.47858C0.410156 4.05499 3.89241 0.410271 9.07805 0.410271H22.9201C28.1057 0.410271 31.5896 4.05499 31.5896 9.47858V22.5215C31.5896 27.945 28.1041 31.5898 22.9185 31.5898ZM9.27453 22.1655C9.27453 23.2141 10.1279 24.0675 11.1765 24.0675C11.508 24.0675 11.8345 23.9805 12.1069 23.8246L16.0175 21.6322L19.8903 23.8213C20.8027 24.3366 21.9662 24.0051 22.4831 23.0878C22.639 22.8039 22.7227 22.4839 22.7227 22.1622L22.7194 11.8878C22.7194 9.41148 21.0472 7.93291 18.246 7.93291H13.7496C10.9894 7.93291 9.27453 9.39835 9.27453 11.7565V22.1655Z"
              fill="#014745"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
