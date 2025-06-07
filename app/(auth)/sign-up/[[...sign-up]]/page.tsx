'use client';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-sky-200/30 to-blue-300/30 dark:from-sky-500/20 dark:to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/20 to-sky-200/20 dark:from-cyan-500/10 dark:to-sky-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <SignUp.Root>
          <Clerk.Loading>
            {isGlobalLoading => (
              <>
                <SignUp.Step name="start">
                  <Card className="w-full sm:w-96 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-0 shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/20">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 p-[1px]">
                      <div className="h-full w-full rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"></div>
                    </div>

                    <div className="relative z-10">
                      <CardHeader className="text-center space-y-4 pb-8">
                        {/* Logo/Icon */}
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                          <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-sm"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent font-bold">
                            Create your account
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-400">
                            Welcome! Please fill in the details to get started.
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-x-4">
                          <Clerk.Connection name="github" asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              type="button"
                              disabled={isGlobalLoading}
                              className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                            >
                              <Clerk.Loading scope="provider:github">
                                {isLoading =>
                                  isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin text-blue-500" />
                                  ) : (
                                    <>
                                      <Icons.gitHub className="mr-2 size-4" />
                                      GitHub
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>
                          <Clerk.Connection name="google" asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              type="button"
                              disabled={isGlobalLoading}
                              className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                            >
                              <Clerk.Loading scope="provider:google">
                                {isLoading =>
                                  isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin text-blue-500" />
                                  ) : (
                                    <>
                                      <Icons.google className="mr-2 size-4" />
                                      Google
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-blue-200 dark:border-blue-800" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 dark:text-slate-400 font-medium">
                              or
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Clerk.Field name="emailAddress" className="space-y-2">
                            <Clerk.Label asChild>
                              <Label className="text-slate-700 dark:text-slate-300 font-medium">Email address</Label>
                            </Clerk.Label>
                            <Clerk.Input type="email" required asChild>
                              <Input className="border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/30 transition-all duration-200" />
                            </Clerk.Input>
                            <Clerk.FieldError className="block text-sm text-red-500 dark:text-red-400" />
                          </Clerk.Field>

                          <Clerk.Field name="password" className="space-y-2">
                            <Clerk.Label asChild>
                              <Label className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
                            </Clerk.Label>
                            <Clerk.Input type="password" required asChild>
                              <Input className="border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/30 transition-all duration-200" />
                            </Clerk.Input>
                            <Clerk.FieldError className="block text-sm text-red-500 dark:text-red-400" />
                          </Clerk.Field>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignUp.Captcha className="empty:hidden" />
                          <SignUp.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold"
                            >
                              <Clerk.Loading>
                                {isLoading => {
                                  return isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Continue';
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignUp.Action>
                          <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            <Clerk.Link navigate="sign-in">Already have an account? Sign in</Clerk.Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="continue">
                  <Card className="w-full sm:w-96 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-0 shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/20">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 p-[1px]">
                      <div className="h-full w-full rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"></div>
                    </div>

                    <div className="relative z-10">
                      <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                          <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-sm"></div>
                          </div>
                        </div>
                        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent font-bold">
                          Continue registration
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <Clerk.Field name="username" className="space-y-2">
                          <Clerk.Label>
                            <Label className="text-slate-700 dark:text-slate-300 font-medium">Username</Label>
                          </Clerk.Label>
                          <Clerk.Input type="text" required asChild>
                            <Input className="border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/30 transition-all duration-200" />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-red-500 dark:text-red-400" />
                        </Clerk.Field>
                      </CardContent>

                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignUp.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold"
                            >
                              <Clerk.Loading>
                                {isLoading => {
                                  return isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Continue';
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignUp.Action>
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="verifications">
                  <SignUp.Strategy name="email_code">
                    <Card className="w-full sm:w-96 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-0 shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/20">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 p-[1px]">
                        <div className="h-full w-full rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"></div>
                      </div>

                      <div className="relative z-10">
                        <CardHeader className="text-center space-y-4">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <div className="w-8 h-8 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent font-bold">
                              Verify your email
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">
                              Use the verification link sent to your email address
                            </CardDescription>
                          </div>
                        </CardHeader>

                        <CardContent className="grid gap-y-6">
                          <div className="grid items-center justify-center gap-y-4">
                            <Clerk.Field name="code" className="space-y-2">
                              <Clerk.Label className="sr-only">Email address</Clerk.Label>
                              <div className="flex justify-center text-center">
                                <Clerk.Input
                                  type="otp"
                                  className="flex justify-center has-[:disabled]:opacity-50"
                                  autoSubmit
                                  render={({ value, status }) => {
                                    return (
                                      <div
                                        data-status={status}
                                        className={cn(
                                          'relative flex size-12 items-center justify-center border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50 text-sm font-semibold transition-all first:rounded-l-lg first:border-l-2 last:rounded-r-lg hover:border-blue-300 dark:hover:border-blue-700',
                                          {
                                            'z-10 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 border-blue-500 dark:border-blue-400 bg-blue-100 dark:bg-blue-900':
                                              status === 'cursor' || status === 'selected',
                                          }
                                        )}
                                      >
                                        {value}
                                        {status === 'cursor' && (
                                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <div className="animate-pulse h-5 w-px bg-blue-500 dark:bg-blue-400" />
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }}
                                />
                              </div>
                              <Clerk.FieldError className="block text-center text-sm text-red-500 dark:text-red-400" />
                            </Clerk.Field>
                            <SignUp.Action
                              asChild
                              resend
                              className="text-muted-foreground"
                              fallback={({ resendableAfter }) => (
                                <Button
                                  variant="link"
                                  size="sm"
                                  disabled
                                  className="text-slate-500 dark:text-slate-400"
                                >
                                  Didn&apos;t receive a code? Resend (
                                  <span className="tabular-nums">{resendableAfter}</span>)
                                </Button>
                              )}
                            >
                              <Button
                                type="button"
                                variant="link"
                                size="sm"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                              >
                                Didn&apos;t receive a code? Resend
                              </Button>
                            </SignUp.Action>
                          </div>
                        </CardContent>

                        <CardFooter>
                          <div className="grid w-full gap-y-4">
                            <SignUp.Action submit asChild>
                              <Button
                                disabled={isGlobalLoading}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-semibold"
                              >
                                <Clerk.Loading>
                                  {isLoading => {
                                    return isLoading ? <Icons.spinner className="size-4 animate-spin" /> : 'Continue';
                                  }}
                                </Clerk.Loading>
                              </Button>
                            </SignUp.Action>
                          </div>
                        </CardFooter>
                      </div>
                    </Card>
                  </SignUp.Strategy>
                </SignUp.Step>
              </>
            )}
          </Clerk.Loading>
        </SignUp.Root>
      </div>
    </div>
  );
}
