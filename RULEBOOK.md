# Landscaping Projects Rulebook

## Overview
This rulebook defines how to track and manage landscaping projects around your house. Each project goes through distinct phases and requires consistent tracking to ensure timely completion and maintenance.

## Project Status Lifecycle

### 1. **Planned**
   - Project has been identified but not yet started
   - Dates are estimated
   - Materials/costs are estimated
   - Action: Assign to a season or prepare materials

### 2. **In Progress**
   - Work has begun
   - Track actual start date
   - Update completion percentage
   - Log any issues or changes
   - Action: Monitor progress, adjust timeline if needed

### 3. **Completed**
   - All work finished
   - Record actual completion date
   - Capture before/after details
   - Action: Schedule maintenance follow-ups

### 4. **On Hold**
   - Work paused temporarily
   - Reason documented
   - Timeline suspended
   - Action: Identify when to resume

### 5. **Cancelled**
   - Project permanently abandoned
   - Reason documented
   - No maintenance tracking
   - Action: Archive and remove from active tracking

## Project Categories

- **Planting**: Trees, shrubs, flowers, gardens
- **Hardscape**: Patios, paths, steps, walls, fencing
- **Water Features**: Ponds, fountains, drainage
- **Lawn Care**: Seeding, sodding, maintenance
- **Tree Work**: Pruning, removal, treatment
- **Seasonal**: Mulching, leaf cleanup, winter prep
- **Misc**: Everything else

## Seasonal Considerations

### Spring
- Best for: Planting, tree work, general cleanup
- Avoid: Major excavation (wet ground)

### Summer
- Best for: Hardscape work, maintenance
- Avoid: Planting (heat stress)

### Fall
- Best for: Planting trees/shrubs, leaf cleanup, seeding
- Avoid: Sensitive plantings

### Winter
- Best for: Planning, design, dormant tree work
- Avoid: Planting, active landscaping (except in mild climates)

## Required Fields for Each Project

| Field | Type | Notes |
|-------|------|-------|
| name | String | Project title/location (e.g., "Front Yard - Rose Garden") |
| category | Enum | One of the categories above |
| description | Text | Detailed description of the work |
| status | Enum | Planned, In Progress, Completed, On Hold, Cancelled |
| location | String | Specific area of yard (Front, Back, Side, etc.) |
| priority | Number | 1-5 scale (5 = urgent) |
| season | String | When this should be done |
| estimated_cost | Decimal | Budget estimate |
| actual_cost | Decimal | Real cost after completion |
| estimated_hours | Decimal | Time estimate |
| actual_hours | Decimal | Real time spent |
| start_date | Date | When work began |
| completion_date | Date | When work finished |
| notes | Text | Additional details, issues, learnings |

## Priority Matrix

### Priority 5 (Critical)
- Affects structural integrity or safety
- Urgent dead/diseased plants
- Drainage/water issues
- Timeline: Start immediately

### Priority 4 (High)
- Visible/curb appeal
- Plant health at risk
- Large projects
- Timeline: Next season

### Priority 3 (Medium)
- Maintenance tasks
- Seasonal improvements
- Planned enhancements
- Timeline: Within season

### Priority 2 (Low)
- Nice-to-haves
- Minor aesthetic work
- Timeline: Flexible

### Priority 1 (Wishlist)
- Future ideas
- Budget permitting
- Timeline: No deadline

## Rules & Best Practices

### Data Entry
1. Fill in all "name" and "description" fields fully
2. Set realistic estimated costs and hours
3. Always link projects to a season
4. Use consistent location naming

### Progress Tracking
1. Update status when work begins
2. Log actual hours and costs as they accrue
3. Note any changes to scope or timeline
4. Document issues encountered

### Seasonal Planning
1. Review and plan projects for next season 3 months out
2. Prioritize based on plant needs and weather
3. Group similar projects (e.g., all planting together)

### Budget Management
1. Set yearly landscaping budget
2. Track actual spending vs. estimates
3. If actual cost exceeds estimate by >20%, note reason
4. Plan next season based on historical costs

### Maintenance Follow-ups
1. Completed planting projects need monthly checks for 3 months
2. New hardscape needs inspection after frost/heat cycles
3. Schedule seasonal maintenance (mulch refresh, cleanup)

## Example Projects

### Example 1: Front Yard Flower Bed
- **Name**: Front Yard Flower Bed Refresh
- **Category**: Planting
- **Status**: Planned
- **Priority**: 3
- **Season**: Spring
- **Location**: Front
- **Estimated Cost**: $150
- **Estimated Hours**: 8
- **Description**: Remove old soil, add new mulch, plant seasonal flowers and shrubs

### Example 2: Patio Repair
- **Name**: Back Patio Stone Replacement
- **Category**: Hardscape
- **Status**: In Progress
- **Priority**: 4
- **Season**: Summer
- **Location**: Back
- **Estimated Cost**: $800
- **Actual Cost**: $750 (so far)
- **Estimated Hours**: 20
- **Actual Hours**: 12 (so far)
- **Description**: Replace cracked flagstone sections, repoint mortar joints

## Maintenance Schedule Template

After project completion, schedule:
- **Week 1**: Visual inspection
- **Month 1**: Check for settling/movement
- **Month 3**: Full assessment and adjustments
- **Season end**: Final review

## Success Criteria

A project is successful when:
1. Work completed to specifications
2. Actual cost ≤ budget (or documented reason for variance)
3. Timeline met or documented
4. Plant/hardscape is healthy/functional 3 months post-completion
5. Notes capture key learnings for future projects
