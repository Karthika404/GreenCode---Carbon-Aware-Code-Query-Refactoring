import { CodePreset } from '../types';

export const CODE_PRESETS: CodePreset[] = [
  {
    id: 'sql-n1-scan',
    title: 'SQL: N+1 Correlated Subquery & Table Scan',
    language: 'sql',
    category: 'Database / OLTP',
    problemSummary: 'Performs nested sequential scans and calculates order totals row-by-row on every user, causing 100,000+ unnecessary disk reads per execution.',
    defaultMonthlyRuns: 1200000,
    originalCode: `-- Inefficient N+1 SQL Query
-- Performs sequential table scans on 4.5M rows without indexes
SELECT 
  u.id,
  u.email,
  u.created_at,
  (SELECT COUNT(*) 
   FROM orders o 
   WHERE o.user_id = u.id 
     AND o.status = 'completed') AS total_completed_orders,
  (SELECT SUM(o.amount) 
   FROM orders o 
   WHERE o.user_id = u.id 
     AND o.status = 'completed') AS total_spent,
  (SELECT MAX(o.created_at) 
   FROM orders o 
   WHERE o.user_id = u.id) AS last_order_date
FROM users u
WHERE u.status = 'active'
  AND (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) > 0
ORDER BY total_spent DESC
LIMIT 50;`
  },
  {
    id: 'python-nested-loops',
    title: 'Python: Nested Loops to Vectorized Tensor Ops',
    language: 'python',
    category: 'AI / Data Science',
    problemSummary: 'Nested O(N^2) Python loop computing pairwise Euclidean distances. Triggers heavy dynamic type checking, GIL lock contention, and high CPU wattage.',
    defaultMonthlyRuns: 650000,
    originalCode: `# Inefficient Nested Python Loop for Distance Calculations
# High CPU thermal dissipation & memory thrashing (O(N^2) scalar ops)
import math

def compute_pairwise_distances(points_a, points_b, threshold=1.5):
    """
    Computes Euclidean distance between every point pair in Python.
    Points are lists of [x, y, z] coordinates.
    """
    matches = []
    
    # Outer loop over all elements in A
    for i in range(len(points_a)):
        p1 = points_a[i]
        
        # Inner loop over all elements in B
        for j in range(len(points_b)):
            p2 = points_b[j]
            
            # Manual scalar arithmetic in Python bytecode
            dist = math.sqrt(
                (p1[0] - p2[0])**2 + 
                (p1[1] - p2[1])**2 + 
                (p1[2] - p2[2])**2
            )
            
            if dist < threshold:
                matches.append((i, j, dist))
                
    return matches`
  },
  {
    id: 'pandas-iterrows',
    title: 'Python: Pandas iterrows() to Vectorized Columnar',
    language: 'python',
    category: 'Data Engineering',
    problemSummary: 'Using iterrows() converts every row to a heavy Pandas Series object, wasting 94% of CPU cycles on Python object instantiations.',
    defaultMonthlyRuns: 400000,
    originalCode: `# Inefficient Pandas row-by-row iteration
# Creates 500,000 intermediate Series objects inside memory
import pandas as pd
import numpy as np

def calculate_sensor_anomalies(df: pd.DataFrame) -> pd.DataFrame:
    results = []
    
    # Inefficient iterrows() loop
    for index, row in df.iterrows():
        temp = row['temperature']
        vibe = row['vibration']
        pressure = row['pressure']
        
        # Complex non-vectorized conditional
        if temp > 85.0 and vibe > 2.4:
            severity = 'CRITICAL'
            score = (temp * 1.5) + (vibe * 12.0)
        elif temp > 70.0 or pressure > 110.0:
            severity = 'WARNING'
            score = (temp * 0.8) + (pressure * 0.4)
        else:
            severity = 'NORMAL'
            score = 0.0
            
        results.append({'row_id': row['id'], 'severity': severity, 'score': score})
        
    return pd.DataFrame(results)`
  },
  {
    id: 'ts-memory-churn',
    title: 'TypeScript: Heavy Object Churn & Nested Filter',
    language: 'typescript',
    category: 'Backend / Node.js Microservice',
    problemSummary: 'Repeated array spreads, JSON serialization inside tight loops, and quadratic find() operations that trigger V8 garbage collection spikes.',
    defaultMonthlyRuns: 2500000,
    originalCode: `// Inefficient Cloud Microservice Data Aggregator
// Causes severe V8 heap fragmentation and CPU lockups
export function aggregateTelemetryEvents(
  events: Array<{ deviceId: string; timestamp: number; payload: string }>,
  deviceMetadata: Array<{ id: string; location: string; tags: string[] }>
) {
  const aggregated: any[] = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    
    // Inefficient O(N) array lookup inside loop -> O(N*M)
    const meta = deviceMetadata.find((d) => d.id === event.deviceId);
    
    // Unnecessary JSON parse on every iteration
    const parsedData = JSON.parse(event.payload);
    
    if (meta && parsedData.status === 'ACTIVE') {
      // Memory churn: spread operator creates new object allocations
      aggregated.push({
        ...event,
        deviceLocation: meta.location,
        enrichedTags: [...meta.tags, 'processed'],
        metrics: parsedData.readings
      });
    }
  }

  // Redundant double sort
  return aggregated.sort((a, b) => b.timestamp - a.timestamp);
}`
  }
];
