import {shcp, calculateSlopeRating} from './helpers';


let players1 = [
    {hcp: 10.3, shcp: 10},
    {hcp: 4.2, shcp: 3},
    {hcp: -0.5, shcp: -2},
    {hcp: -0.7, shcp: -2}
]

test('Test 1 of hcp to sloped hcp', () => {
  expect(shcp(players1)).toEqual({newHcpPrel: [11, 5, 0, 0], slopeHandicapList: [10, 3, -2, -2]});
});


let players2 = [
    {hcp: 10.3, shcp: 16},
    {hcp: 4.2, shcp: 5},
    {hcp: 8.2, shcp: 13},
    {hcp: 14.9, shcp: 18}
]

test('Test 2 of hcp to sloped hcp', () => {
  expect(shcp(players2)).toEqual({newHcpPrel: [10, 0, 7, 12], slopeHandicapList: [16, 5, 13, 18]});
});


test('Test of calculateSlopeRating (hcp 8,2, slope 135, CR 71,0, CP 72)', () => {
    expect(calculateSlopeRating('8.2', '135.0', '71.0', 72)).toBe(999);
});

test('Test of calculateSlopeRating (hcp 14.9, slope 126.0, CR 66.4, CP 72)', () => {
    expect(calculateSlopeRating('14.9', '126.0', '66.4', 72)).toBe(11);
});
  
test('Test of calculateSlopeRating (hcp 10,3, slope 112.0, CR 66.9, CP 71)', () => {
    expect(calculateSlopeRating('10.3', '112.0', '66.9', 71)).toBe(6);
});
  