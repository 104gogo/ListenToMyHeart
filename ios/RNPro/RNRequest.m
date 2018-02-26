#import "RNRequest.h"

@implementation RNRequest

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(get:(NSString *)requestUrl callback:(RCTResponseSenderBlock)callback) {
  NSString *urlString = @"http://120.79.72.243:7001";
  // NSString *urlString = @"http://172.16.77.253:7002";
  urlString = [urlString stringByAppendingString:requestUrl];

  NSURL *url = [NSURL URLWithString:urlString];

  NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:url];
  [urlRequest setTimeoutInterval:30.0f];
  [urlRequest setHTTPMethod:@"GET"];
  NSOperationQueue *queue = [[NSOperationQueue alloc] init];
  [NSURLConnection sendAsynchronousRequest:urlRequest queue:queue completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
    if ([data length] > 0 && connectionError == nil) {
        NSString *html = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        NSData *jsonData = [html dataUsingEncoding:NSUTF8StringEncoding];
        NSError *err;
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];

        callback(@[dic]);
    }else if([data length] == 0 && connectionError == nil){
        NSLog(@"nothing was download.");
    }else if(connectionError != nil){
        NSLog(@"Error happened = %@",connectionError);
    }
  }];
}

@end
