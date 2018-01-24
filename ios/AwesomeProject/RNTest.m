#import "RNTest.h"

@implementation RNTest

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(print:(NSString *)text) {
    NSLog(@"%@", text);
}

@end
