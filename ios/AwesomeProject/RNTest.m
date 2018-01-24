#import "RNTest.h"

@implementation RNTest

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(print:(NSString *)text) {
    NSLog(@"%@", text);
}


RCT_EXPORT_METHOD(requestUrl) {
    //send a GET request to server with some params  

    NSString *urlString = @"https://api.github.com/users/104gogo";
//     urlString = [urlString stringByAppendingString:@"?p=1059"];
    NSURL *url = [NSURL URLWithString:urlString];
    NSMutableURLRequest *urlRequest = [NSMutableURLRequest requestWithURL:url];  
    [urlRequest setTimeoutInterval:30.0f];  
    [urlRequest setHTTPMethod:@"GET"];  
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];  
    [NSURLConnection sendAsynchronousRequest:urlRequest queue:queue completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {  
        if ([data length] > 0 && connectionError == nil) {  
            NSString *html = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];  
            NSLog(@"HTML = %@",html);  
        }else if([data length] == 0 && connectionError == nil){  
            NSLog(@"nothing was download.");  
        }else if(connectionError != nil){  
            NSLog(@"Error happened = %@",connectionError);  
        }  
    }];  
}

@end
