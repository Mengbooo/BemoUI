import { useMemo } from 'react';

function project(lat, lng, width, height) {
  return {
    x: ((lng + 180) / 360) * width,
    y: ((90 - lat) / 180) * height,
  };
}

function isLand(lat, lng) {
  if (lat > 60 && lat < 84 && lng > -55 && lng < -15) return true;
  if (lat > 25 && lat < 72 && lng > -140 && lng < -52) return true;
  if (lat > 15 && lat < 32 && lng > -117 && lng < -86) return true;
  if (lat > -56 && lat < 12 && lng > -82 && lng < -34) return true;
  if (lat > 36 && lat < 72 && lng > -10 && lng < 40) return true;
  if (lat > 50 && lat < 59 && lng > -8 && lng < 2) return true;
  if (lat > 63 && lat < 67 && lng > -25 && lng < -13) return true;
  if (lat > -35 && lat < 37 && lng > -18 && lng < 52) {
    if (lat > 18 && lng < -8) return false;
    return true;
  }
  if (lat > -26 && lat < -12 && lng > 43 && lng < 51) return true;
  if (lat > 5 && lat < 75 && lng > 40 && lng < 180) {
    if (lat < 12 && lng > 70 && lng < 100) return lng > 95;
    return true;
  }
  if (lat > -11 && lat < 8 && lng > 95 && lng < 141) return true;
  if (lat > 30 && lat < 46 && lng > 129 && lng < 146) return true;
  if (lat > -44 && lat < -10 && lng > 113 && lng < 154) return true;
  if (lat > -47 && lat < -34 && lng > 166 && lng < 179) return true;
  return false;
}

function generateMapPoints(width, height, mapSamples) {
  const aspect = width / Math.max(height, 1);
  const nY = Math.max(8, Math.ceil(Math.sqrt(mapSamples / aspect) * 1.75));
  const nX = Math.max(8, Math.ceil(nY * aspect * 1.75));
  const collected = [];

  for (let iy = 0; iy < nY; iy += 1) {
    for (let ix = 0; ix < nX; ix += 1) {
      const lng = -180 + (360 * (ix + 0.5)) / nX;
      const lat = 90 - (180 * (iy + 0.5)) / nY;
      if (!isLand(lat, lng)) continue;
      collected.push(project(lat, lng, width, height));
    }
  }

  if (collected.length <= mapSamples) return collected;

  const sampled = [];
  const step = collected.length / mapSamples;
  for (let i = 0; i < mapSamples; i += 1) {
    sampled.push(collected[Math.floor(i * step)]);
  }
  return sampled;
}

function processMarkers(markers, width, height) {
  return markers.map((marker) => {
    const { lat, lng, ...rest } = marker;
    const { x, y } = project(lat, lng, width, height);
    return { ...rest, x, y };
  });
}

function buildStaggerHelpers(points) {
  const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
  const rowMap = new Map();
  let step = 0;
  let prevY = Number.NaN;
  let prevXInRow = Number.NaN;

  for (const p of sorted) {
    if (p.y !== prevY) {
      prevY = p.y;
      prevXInRow = Number.NaN;
      if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size);
    }
    if (!Number.isNaN(prevXInRow)) {
      const delta = p.x - prevXInRow;
      if (delta > 0) step = step === 0 ? delta : Math.min(step, delta);
    }
    prevXInRow = p.x;
  }

  return { xStep: step || 1, yToRowIndex: rowMap };
}

function rowOffsetForY(y, yToRowIndex, xStep, stagger) {
  if (!stagger || yToRowIndex.size === 0) return 0;
  let bestY = null;
  let bestDist = Infinity;
  yToRowIndex.forEach((_, rowY) => {
    const dist = Math.abs(rowY - y);
    if (dist < bestDist) {
      bestDist = dist;
      bestY = rowY;
    }
  });
  const rowIndex = bestY == null ? 0 : yToRowIndex.get(bestY) ?? 0;
  return rowIndex % 2 === 1 ? xStep / 2 : 0;
}

function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  dotColor = '#9CA3AF',
  markerColor = '#1620E4',
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  disabled = false,
  renderMarkerOverlay,
  className = '',
  style,
  'aria-label': ariaLabel = 'Dotted world map',
  ...svgProps
}) {
  const points = useMemo(
    () => generateMapPoints(width, height, mapSamples),
    [width, height, mapSamples]
  );
  const processedMarkers = useMemo(
    () => processMarkers(markers, width, height),
    [markers, width, height]
  );
  const { xStep, yToRowIndex } = useMemo(
    () => buildStaggerHelpers(points),
    [points]
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={["block overflow-visible text-gray-500", disabled ? 'opacity-50 pointer-events-none' : '', className].filter(Boolean).join(' ')}
      style={{ width: '100%', height: '100%', ...style }}
      role="img"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      {...svgProps}
    >
      {points.map((point, index) => {
        const offsetX = rowOffsetForY(point.y, yToRowIndex, xStep, stagger);
        return (
          <circle
            key={`dot-${point.x}-${point.y}-${index}`}
            className="pointer-events-none"
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill={dotColor}
          />
        );
      })}

      {processedMarkers.map((marker, index) => {
        const offsetX = rowOffsetForY(marker.y, yToRowIndex, xStep, stagger);
        const x = marker.x + offsetX;
        const y = marker.y;
        const r = marker.size ?? dotRadius;
        const shouldPulse = disabled
          ? false
          : pulse
            ? marker.pulse !== false
            : marker.pulse === true;

        return (
          <g key={`marker-${marker.x}-${marker.y}-${index}`} className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1620E4]">
            <circle cx={x} cy={y} r={r} fill={markerColor} />
            {shouldPulse ? (
              <g className="pointer-events-none" aria-hidden="true">
                <circle
                  className="bemo-dotted-map-pulse-ring origin-center [transform-box:fill-box] motion-reduce:animate-none motion-reduce:opacity-0"
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeWidth={0.35}
                  style={{ animation: 'bemo-dotted-map-pulse 1.4s ease-out infinite' }}
                />
                <circle
                  className="bemo-dotted-map-pulse-ring origin-center [transform-box:fill-box] motion-reduce:animate-none motion-reduce:opacity-0"
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeWidth={0.3}
                  strokeOpacity={0.9}
                  style={{ animation: 'bemo-dotted-map-pulse 1.4s ease-out 0.7s infinite' }}
                />
              </g>
            ) : null}
            {renderMarkerOverlay?.({
              marker: { ...marker, x, y },
              index,
              x,
              y,
              r,
            })}
          </g>
        );
      })}
    </svg>
  );
}

export default DottedMap;

/*
Required global keyframes (add to your CSS):

@keyframes bemo-dotted-map-pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.8); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .bemo-dotted-map-pulse-ring {
    animation: none !important;
    opacity: 0 !important;
  }
}

Accent defaults: marker #1620E4, optional highlight #7BE9C6.
*/
