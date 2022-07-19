import { checkExtension } from './index';

it('should fail if extension not match', () => {
  expect(checkExtension(['.kml'], 'test.kml')).toBe(true);
  expect(checkExtension(['.kml'], 'test.kml.txt')).toBe(false);
  expect(checkExtension(['.kml'], 'test.kmltxt')).toBe(false);
  expect(checkExtension(['.kml'], 'test.txtkml')).toBe(false);
  expect(checkExtension(['.kml'], 'test.txt')).toBe(false);
});

it('should fail if extension not matchs', () => {
  expect(checkExtension(['.kml', '.kmls'], 'test.kmls')).toBe(true);
  expect(checkExtension(['.kml', '.kmls'], 'test.kml')).toBe(true);
  expect(checkExtension(['.kml', '.kmls'], 'test.kmls.txt')).toBe(false);
  expect(checkExtension(['.kml', '.kmls'], 'test.kmlstxt')).toBe(false);
  expect(checkExtension(['.kml', '.kmls'], 'test.txtkmls')).toBe(false);
  expect(checkExtension(['.kml', '.kmls'], 'test.txt')).toBe(false);
});