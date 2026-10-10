import React from 'react';

interface IntelAyuLogoProps {
  className?: string;
  height?: number | string;
  withFrame?: boolean;
}

export const IntelAyuLogo: React.FC<IntelAyuLogoProps> = ({
  className = '',
  height = 42,
  withFrame = true,
}) => {
  return (
    <div
      className={`inline-flex items-center transition-all ${
        withFrame
          ? 'bg-white rounded-[14px] border border-[#1E5627] px-3 py-1 shadow-xs'
          : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 295 80"
        height={height}
        className="w-auto max-w-full select-none overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Natural Ayurvedic Forest Green Gradient */}
          <linearGradient id="slenderDarkGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B3813" />
            <stop offset="60%" stopColor="#124A1A" />
            <stop offset="100%" stopColor="#082A0E" />
          </linearGradient>

          {/* Fresh Botanical Leaf Gradient */}
          <linearGradient id="slenderLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="50%" stopColor="#43A047" />
            <stop offset="100%" stopColor="#7CB342" />
          </linearGradient>

          {/* Bright Leaf Highlight */}
          <linearGradient id="slenderBrightLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="60%" stopColor="#388E3C" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>

          {/* Mortar Gradient */}
          <linearGradient id="slenderMortarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="40%" stopColor="#1B5E20" />
            <stop offset="100%" stopColor="#0A3311" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* 1. SLENDER CAPITAL "I" WITH NATURAL VINE & DELICATE SPROUTS   */}
        {/* ============================================================== */}
        <g id="letter-I">
          {/* Top Serif */}
          <path d="M 18 25 L 34 25 L 34 28 L 29 28 L 29 65 L 34 65 L 34 68 L 18 68 L 18 65 L 23 65 L 23 28 L 18 28 Z" fill="url(#slenderDarkGreen)" />

          {/* Slender Vine wrapping around 'I' */}
          <path
            d="M 17 62 C 22 56 27 50 28 40 C 29 32 26 27 25 24"
            stroke="#2E7D32"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 27 41 C 31 46 32 54 31 60"
            stroke="#2E7D32"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Delicate Sprouting Leaves at top of 'I' */}
          <path
            d="M 26 23 C 22 17 21 8 28 6 C 30 12 29 18 26 23 Z"
            fill="url(#slenderLeafGrad)"
          />
          <path
            d="M 27 23 C 31 18 38 14 41 20 C 36 24 31 24 27 23 Z"
            fill="url(#slenderBrightLeaf)"
          />

          {/* Delicate Side Leaves */}
          <path
            d="M 19 44 C 13 42 10 33 15 29 C 19 33 20 39 19 44 Z"
            fill="url(#slenderLeafGrad)"
          />
          <path
            d="M 18 53 C 12 55 9 48 13 43 C 17 45 18 50 18 53 Z"
            fill="url(#slenderBrightLeaf)"
          />
          <path
            d="M 30 57 C 34 59 36 64 33 67 C 29 65 29 60 30 57 Z"
            fill="url(#slenderLeafGrad)"
          />
        </g>

        {/* ============================================================== */}
        {/* 2. "ntel-" ELEGANT SERIF TYPOGRAPHY (SLENDER & REFINED)       */}
        {/* ============================================================== */}
        <text
          x="38"
          y="66.5"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="39"
          fontWeight="600"
          letterSpacing="-0.3"
          fill="url(#slenderDarkGreen)"
        >
          ntel
        </text>

        {/* Refined Hyphen '-' */}
        <rect
          x="110"
          y="46.5"
          width="13"
          height="4.2"
          rx="0.8"
          fill="url(#slenderDarkGreen)"
        />

        {/* ============================================================== */}
        {/* 3. PROPORTIONED, SLENDER CAPITAL "A" WITH AYURVEDIC MORTAR     */}
        {/* ============================================================== */}
        <g id="letter-A-compact">
          {/* Slender Left Leg of 'A' */}
          <path
            d="M 132 68 L 160 12 L 167 12 L 144 68 Z"
            fill="url(#slenderDarkGreen)"
          />

          {/* Slender Right Leg of 'A' */}
          <path
            d="M 163 12 L 171 12 L 198 68 L 189 68 L 168 25 Z"
            fill="url(#slenderDarkGreen)"
          />

          {/* Neat Base Serifs */}
          <path d="M 127 68 L 146 68 L 146 65.5 L 127 65.5 Z" fill="url(#slenderDarkGreen)" />
          <path d="M 186 68 L 202 68 L 202 65.5 L 186 65.5 Z" fill="url(#slenderDarkGreen)" />

          {/* Compact Ayurvedic Mortar Bowl in the center of 'A' */}
          <path
            d="M 152 50 C 152 61 179 61 179 50 C 179 49 152 49 152 50 Z"
            fill="url(#slenderMortarGrad)"
          />
          {/* Oval Rim of Mortar */}
          <ellipse
            cx="165.5"
            cy="50"
            rx="13.5"
            ry="2.8"
            fill="#388E3C"
            stroke="#1B5E20"
            strokeWidth="0.6"
          />

          {/* Angled Pestle */}
          <g id="slender-pestle">
            <path
              d="M 176 40 L 184 48 C 185 49 184 51 183 52 C 181 53 179 52 178 50 L 171 43 Z"
              fill="#1B5E20"
            />
            <circle cx="185" cy="47" r="3.2" fill="#0D3B13" />
            <ellipse cx="184" cy="46" rx="2" ry="1.2" fill="#81C784" />
          </g>

          {/* Herbal Plant Sprouting out of the Mortar */}
          <g id="slender-mortar-plant">
            {/* Center stem */}
            <path d="M 165.5 49 L 165.5 35" stroke="#2E7D32" strokeWidth="1.6" strokeLinecap="round" />
            {/* Center leaf */}
            <path
              d="M 165.5 35 C 162 29 163 22 165.5 20 C 168 22 169 29 165.5 35 Z"
              fill="url(#slenderBrightLeaf)"
            />
            {/* Left leaf */}
            <path
              d="M 165 42 C 157 39 156 31 161 28 C 164 31 165 37 165 42 Z"
              fill="url(#slenderLeafGrad)"
            />
            {/* Right leaf */}
            <path
              d="M 166 42 C 174 39 175 31 170 28 C 167 31 166 37 166 42 Z"
              fill="url(#slenderBrightLeaf)"
            />
          </g>

          {/* Slender Leaf Sweep at the base of 'A' */}
          <path
            d="M 143 63 C 149 68 165 69 178 65 C 170 68 153 70 143 63 Z"
            fill="url(#slenderLeafGrad)"
          />
          <path
            d="M 143 63 C 137 60 134 55 138 52 C 142 54 142 60 143 63 Z"
            fill="url(#slenderBrightLeaf)"
          />
        </g>

        {/* ============================================================== */}
        {/* 4. 'yu' WITH DELICATE BOTANICAL LEAF SPRAY                     */}
        {/* ============================================================== */}
        <g id="letters-yu-slender">
          {/* 'y' */}
          <text
            x="193"
            y="66.5"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="39"
            fontWeight="600"
            letterSpacing="-0.3"
            fill="url(#slenderDarkGreen)"
          >
            y
          </text>

          {/* 'u' */}
          <text
            x="213"
            y="66.5"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="39"
            fontWeight="600"
            letterSpacing="-0.3"
            fill="url(#slenderDarkGreen)"
          >
            u
          </text>

          {/* Delicate 5-Leaf Sprig sprouting from 'u' */}
          <g id="slender-leaf-sprig" transform="translate(230, 22)">
            {/* Branch stem */}
            <path
              d="M 2 24 C 6 17 14 12 25 8"
              stroke="#2E7D32"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Terminal leaf (top right) */}
            <path
              d="M 25 8 C 31 6 38 9 36 15 C 30 15 26 12 25 8 Z"
              fill="url(#slenderLeafGrad)"
            />

            {/* Top upright leaf */}
            <path
              d="M 18 10 C 20 3 27 -2 31 3 C 27 8 22 10 18 10 Z"
              fill="url(#slenderBrightLeaf)"
            />

            {/* Upper left leaf */}
            <path
              d="M 14 12 C 10 6 13 0 19 2 C 18 7 15 11 14 12 Z"
              fill="url(#slenderLeafGrad)"
            />

            {/* Lower right leaf */}
            <path
              d="M 21 13 C 27 14 32 20 28 24 C 23 23 21 18 21 13 Z"
              fill="url(#slenderBrightLeaf)"
            />

            {/* Lower left leaf */}
            <path
              d="M 11 18 C 8 23 13 27 18 24 C 16 19 14 18 11 18 Z"
              fill="url(#slenderLeafGrad)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
