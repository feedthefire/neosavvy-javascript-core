describe("BrowserUtils", function () {

    beforeEach(function () {
        console.warn = jasmine.createSpy('console.warn');
    });

    describe("browser error", function () {
        it("Should not throw an error on loading a string that causes a browser error", function () {
            expect(function () {
                ns.reload("peanut");
            }).not.toThrow();
            expect(console.warn).toHaveBeenCalledWith("Trouble getting the browser or browser version, check the code or report a bug with the userAgent listed.");
        });

        it("Should return null for the info().browser", function () {
            ns.reload("peanut");
            expect(ns.info().browser).toBeNull();
        });

        it("Should return null for the browser", function () {
            ns.reload("peanut");
            expect(ns.browser()).toBeNull();
        });
    });

    describe("browserVersion error", function () {
        it("Should not throw an error on loading a string that causes a browserVersion error", function () {
            expect(function () {
                ns.reload("opera, version");
            }).not.toThrow();
            expect(console.warn).toHaveBeenCalledWith("Trouble getting the browser or browser version, check the code or report a bug with the userAgent listed.");
        });

        it("Should return null for the info().version", function () {
            ns.reload("OPR, Version");
            expect(ns.info().browser).toBeNull();
        });

        it("Should return null for the browserVersion() method", function () {
            ns.reload("OPR, Version");
            expect(ns.browserVersion()).toBeNull();
        });
    });

    describe("os error", function () {
        it("Should not throw an error on loading a string that causes and os error", function () {
            expect(function () {
                ns.reload("OPR/17932478");
            }).not.toThrow();
            expect(console.warn).toHaveBeenCalledWith("Trouble getting the os, check the code or report a bug with the userAgent listed.");
        });

        it("Should have info().os set to null ", function () {
            ns.reload("OPR/17932478");
            expect(ns.info().os).toBeNull();
        });

        it("Should have os() set to null", function () {
            ns.reload("OPR/17932478");
            expect(ns.os()).toBeNull();
        });
    });

    describe("osVersion error", function () {
        it("Should throw an error on loading a string that causes and osVersion error", function () {
            expect(function () {
                ns.reload("OPR/17932478, mac");
            }).not.toThrow();
            expect(console.warn).toHaveBeenCalledWith("Trouble getting the os version, check the code or report a bug with the userAgent listed.");
        });

        it("Should have the info().osVersion set to null", function () {
            ns.reload("OPR/17932478, mac");
            expect(ns.info().osVersion).toBeNull();
        });

        it("Should have the osVersion() set to null", function () {
            ns.reload("OPR/17932478, mac");
            expect(ns.osVersion()).toBeNull();
        });

    });

    describe("info", function () {

        it("Should return a hash that defines a browser attribute", function () {
            expect(ns.info().browser).toBeDefined();
        });

        it("Should return a hash that defines a browserVersion attribute", function () {
            expect(ns.info().browserVersion).toBeDefined();
        });

        it("Should return a hash that defines an os attribute", function () {
            expect(ns.info().os).toBeDefined();
        });

        it("Should return a hash that defines an osVersion attribute", function () {
            expect(ns.info().osVersion).toBeDefined();
        });

        it("Should have a browser attribute matching the function by the same name", function () {
            expect(ns.info().browser).toEqual(ns.browser());
        });

        it("Should have a browserVersion attribute matching the function by the same name", function () {
            expect(ns.info().browserVersion).toEqual(ns.browserVersion());
        });

        it("Should have the os attribute matching the function by the same name", function () {
            expect(ns.info().os).toEqual(ns.os());
        });

        it("Should have an osVersion attribute matching the function by the same name", function () {
            expect(ns.info().osVersion).toEqual(ns.osVersion());
        });
    });

    describe("browser", function () {

        describe("INTERNET_EXPLORER", function () {
            describe("IE 8", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729)");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(ns.isInternetExplorer()).toBeTruthy();
                });
            });

            describe("IE 9", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(ns.isInternetExplorer()).toBeTruthy();
                });
            });

            describe("IE 10", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(ns.isInternetExplorer()).toBeTruthy();
                });
            });

            describe("IE 11", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(ns.isInternetExplorer()).toBeTruthy();
                });
            });
        });

        describe("FIREFOX", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:26.0) Gecko/20100101 Firefox/26.0");
            });

            it("Should equal the FIREFOX def when firefox userAgent", function () {
                expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.FIREFOX);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(ns.isFirefox()).toBeTruthy();
            });
        });

        describe("CHROME", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
            });

            it("Should equal the CHROME def when chrome userAgent", function () {
                expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.CHROME);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(ns.isChrome()).toBeTruthy();
            });
        });

        describe("SAFARI", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1");
            });

            it("Should equal the SAFARI def when safari userAgent", function () {
                console.log(ns.info())
                expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.SAFARI);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(ns.isSafari()).toBeTruthy();
            });
        });

        describe("OPERA", function () {
            beforeEach(function () {
                    ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 OPR/17.0.1241.53");
            });

            it("Should equal the OPERA def when opera userAgent", function () {
                expect(ns.browser()).toEqual(ns.CONSTANTS.BROWSER.OPERA);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(ns.isOpera()).toBeTruthy();
            });
        });

    });

    describe("os", function () {
        describe("OSX", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.OSX);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isOsx()).toBeTruthy();
            });
        });

        describe("WINDOWS", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.WINDOWS);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isWindows()).toBeTruthy();
            });
        });

        describe("LINUX", function () {
            beforeEach(function () {
                ns.reload("﻿Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:23.0) Gecko/20100101 Firefox/23.0");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.LINUX);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isLinux()).toBeTruthy();
            });
        });

        describe("FREE_BSD", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (X11; U; FreeBSD amd64; en-US; rv:1.8.0.8) Gecko/20061116 Firefox/1.5.0.8");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.FREE_BSD);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isFreeBsd()).toBeTruthy();
            });
        });

        describe("IPHONE", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.IPHONE);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isIphone()).toBeTruthy();
            });
        });

        describe("IPOD", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A100a Safari/419.3");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.IPOD);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isIpod()).toBeTruthy();
            });
        });

        describe("IPAD", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.IPAD);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isIpad()).toBeTruthy();
            });
        });

        describe("ANDROID", function () {
            describe("Phone", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; HTC Desire Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
                });

                it("Should match the platform when provided in the userAgent", function () {
                    expect(ns.os()).toEqual(ns.CONSTANTS.OS.ANDROID);
                });

                it("Should work well with the is... call", function () {
                    expect(ns.isAndroid()).toBeTruthy();
                });
            });

            describe("Tablet", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19");
                });

                it("Should match the platform when provided in the userAgent", function () {
                    expect(ns.os()).toEqual(ns.CONSTANTS.OS.ANDROID);
                });

                it("Should work well with the is... call", function () {
                    expect(ns.isAndroid()).toBeTruthy();
                });
            });
        });

        describe("BLACKBERRY", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.BLACKBERRY);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isBlackberry()).toBeTruthy();
            });
        });

        describe("J2ME", function () {
            beforeEach(function () {
                ns.reload("Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.J2ME);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isJ2me()).toBeTruthy();
            });
        });

        describe("WEB_TV", function () {
            beforeEach(function () {
                ns.reload("Mozilla/3.0 WebTV/1.2 (compatible; MSIE 2.0)");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(ns.os()).toEqual(ns.CONSTANTS.OS.WEB_TV);
            });

            it("Should work well with the is... call", function () {
                expect(ns.isWebTv()).toBeTruthy();
            });
        });
    });

    describe("browserVersion", function () {
        it("Should always return a string value for the version", function () {
            expect(typeof ns.browserVersion() === 'string').toBeTruthy();
        });

        describe("INTERNET_EXPLORER", function () {
            it("Should be able to return a version for 8", function () {
                ns.reload("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729)");
                expect(ns.browserVersion()).toEqual("8.0");
            });

            it("Should be able to return a version for 9", function () {
                ns.reload("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)");
                expect(ns.browserVersion()).toEqual("9.0");
            });

            it("Should be able to return a version for 10", function () {
                ns.reload("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)");
                expect(ns.browserVersion()).toEqual("10.0");
            });

            it("Should be able to return a version for 11", function () {
                ns.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
                expect(ns.browserVersion()).toEqual("11.0");
            });
        });

        describe("FIREFOX", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:26.356) Gecko/20100101 Firefox/26.356");
                expect(ns.browserVersion()).toEqual("26.356");
            });

            it("Should be able to retrieve a whole number version", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:26.0) Gecko/20100101 Firefox/26.0");
                expect(ns.browserVersion()).toEqual("26.0");
            });
        });

        describe("CHROME", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
                expect(ns.browserVersion()).toEqual("31.0.1650.63");
            });

            it("Should be able to retrieve a whole number version", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0 Safari/537.36");
                expect(ns.browserVersion()).toEqual("31.0");
            });
        });

        describe("SAFARI", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1");
                expect(ns.browserVersion()).toEqual("6.0.5");
            });

            it("Should be able to retrieve a whole number version", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0 Safari/536.30.1");
                expect(ns.browserVersion()).toEqual("6.0");
            });
        });

        describe("OPERA", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 OPR/17.0.1241.53");
                expect(ns.browserVersion()).toEqual("17.0.1241.53");
            });

            it("Should be able to retrieve a whole number version", function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 OPR/17.0");
                expect(ns.browserVersion()).toEqual("17.0");
            });
        });
    });

    describe("osVersion ", function () {
        describe("OSX", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
            });

            it("Should return a decimalized version of the version for the os", function () {
                expect(ns.osVersion()).toEqual("10.8.5");
            });
        });

        describe("WINDOWS", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
            });

            it("Should provide the nt version of the windows os", function () {
                expect(ns.osVersion()).toEqual("6.3");
            });
        });

        describe("LINUX", function () {
            beforeEach(function () {
                ns.reload("﻿Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:23.0) Gecko/20100101 Firefox/23.0");
            });

            it("Should have a null osVersion with linux", function () {
                expect(ns.osVersion()).toBeNull();
            });
        });

        describe("FREE_BSD", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (X11; U; FreeBSD amd64; en-US; rv:1.8.0.8) Gecko/20061116 Firefox/1.5.0.8");
            });

            it("Should have a null osVersion with free bsd", function () {
                expect(ns.osVersion()).toBeNull();
            });
        });

        describe("IPHONE", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should return the decimalized version of the iphone version", function () {
                expect(ns.osVersion()).toEqual("5.0");
            });
        });

        describe("IPOD", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A100a Safari/419.3");
            });

            it("Should return the decimalized version for the ipod in question", function () {
                expect(ns.osVersion()).toBeNull();
            });
        });

        describe("IPAD", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should return a decimalized version for the iPad in question", function () {
                expect(ns.osVersion()).toEqual("5.0");
            });
        });

        describe("ANDROID", function () {
            describe("Phone", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; HTC Desire Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
                });

                it("Should return the decimalized version 2.3.4 of the android platform", function () {
                    expect(ns.osVersion()).toEqual("2.3.4");
                });
            });

            describe("Tablet", function () {
                beforeEach(function () {
                    ns.reload("Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19");
                });

                it("Should return the decimalized version 2.3.4 of the android platform", function () {
                    expect(ns.osVersion()).toEqual("4.0.4");
                });
            });
        });

        describe("BLACKBERRY", function () {
            beforeEach(function () {
                ns.reload("Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+");
            });

            it("Should return the 9900 for the Blackberry version", function () {
                expect(ns.osVersion()).toEqual("9900");
            });
        });

        describe("J2ME", function () {
            beforeEach(function () {
                ns.reload("Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54");
            });

            it("Should return null for j2me", function () {
                expect(ns.osVersion()).toBeNull();
            });
        });

        describe("WEB_TV", function () {
            beforeEach(function () {
                ns.reload("Mozilla/3.0 WebTV/1.2 (compatible; MSIE 2.0)");
            });

            it("Should return the decimalized 1.2 for the web tv", function () {
                expect(ns.osVersion()).toEqual("1.2");
            });
        });
    });

    it("Should set the osVersion to null if the regex raises an error", function () {
        ns.reload("Mozilla/3.0 WebTV  /1.2 (compatible; MSIE 2.0)");
        expect(ns.osVersion()).toBeNull();
    });

    describe("discovered strings", function () {
        /* This section is a great place to test new user agent strings and add the behavior, this will be automated in the future */

        describe("Chrome for IOS", function () {

            beforeEach(function () {
                ns.reload('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_6 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/33.0.1750.14 Mobile/11B651 Safari/9537.53');
            });

            it("Should return true for isChrome()", function () {
                expect(ns.isChrome()).toBeTruthy();
            });

            it("Should return true for isIphone()", function () {
                expect(ns.isIphone()).toBeTruthy();
            });

            it("Should return the proper chrome version", function () {
                expect(ns.browserVersion()).toEqual('33.0.1750.14');
            });

            it("Should return the proper iPhone version", function () {
                expect(ns.osVersion()).toEqual('7.0.6');
            });

        });

        describe("firefox 27", function () {
            beforeEach(function () {
                ns.reload('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:27.0) Gecko/20100101 Firefox/27.0');
            });

            it("Should return true for isFirefox()", function () {
                expect(ns.isFirefox()).toBeTruthy();
            });

            it("Should return true for isOsx()", function () {
                expect(ns.isOsx()).toBeTruthy();
            });

            it("Should return 27.0 for the browserVersion", function () {
                expect(ns.browserVersion()).toEqual('27.0');
            });

            it("Should return 10.8 for osVersion", function () {
                expect(ns.osVersion()).toEqual("10.8");
            });
        });

    });
});