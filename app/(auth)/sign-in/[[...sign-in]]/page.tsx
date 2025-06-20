'use client';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';
import { KeyRound, Mail, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { SparklesAnimation } from '@/components/animations/SparklesAnimation';
import AnimatedBackground from '@/components/animations/AnimatedBackground';

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0910] via-[#0c0b1a] to-[#1a1a2e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <SparklesAnimation />
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50">
        <AnimatedBackground />
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3A8EF6]/20 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5CF4A0]/20 rounded-full filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6B46C1]/15 rounded-full filter blur-3xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <SignIn.Root>
        <Clerk.Loading>
          {isGlobalLoading => (
            <>
              {/* Start Step */}
              <SignIn.Step name="start">
                <Card className="w-full sm:w-[480px] border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl rounded-3xl relative overflow-hidden">
                  <div className="relative z-10">
                    <CardHeader className="text-center pt-12 pb-8 px-10">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className="object-contain mx-auto mb-0 mt-0 overflow-hidden"
                        priority
                      />
                      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-3">
                        Welcome Back
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-lg font-medium">
                        Sign in to access your dashboard.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-10 pb-4">
                      <div className="space-y-6">
                        {/* Social login buttons */}
                        <div className="grid grid-cols-2 gap-4">
                          <Clerk.Connection name="github" asChild>
                            <Button
                              size="lg"
                              variant="outline"
                              type="button"
                              disabled={isGlobalLoading}
                              className="h-12 border-white/20 bg-white/10 hover:border-[#3A8EF6]/50 hover:bg-white/20 transition-all duration-200 font-semibold text-slate-300 hover:text-white shadow-sm hover:shadow-md"
                            >
                              <Clerk.Loading scope="provider:github">
                                {isLoading =>
                                  isLoading ? (
                                    <Icons.spinner className="size-5 animate-spin text-[#3A8EF6]" />
                                  ) : (
                                    <>
                                      <Icons.gitHub className="mr-3 size-5" />
                                      GitHub
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>

                          <Clerk.Connection name="google" asChild>
                            <Button
                              size="lg"
                              variant="outline"
                              type="button"
                              disabled={isGlobalLoading}
                              className="h-12 border-white/20 bg-white/10 hover:border-[#3A8EF6]/50 hover:bg-white/20 transition-all duration-200 font-semibold text-slate-300 hover:text-white shadow-sm hover:shadow-md"
                            >
                              <Clerk.Loading scope="provider:google">
                                {isLoading =>
                                  isLoading ? (
                                    <Icons.spinner className="size-5 animate-spin text-[#3A8EF6]" />
                                  ) : (
                                    <>
                                      <Icons.google className="mr-3 size-5" />
                                      Google
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>
                        </div>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center py-4">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                          </div>
                          <div className="relative bg-[#100f1c] px-6">
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                              or continue with
                            </span>
                          </div>
                        </div>

                        {/* Email/Identifier field */}
                        <Clerk.Field name="identifier" className="space-y-3">
                          <Clerk.Label asChild>
                            <Label className="text-sm font-semibold text-slate-300 block mb-2">Email address</Label>
                          </Clerk.Label>
                          <Clerk.Input type="email" required asChild>
                            <Input
                              className="h-12 px-4 text-base border-2 border-white/20 focus:border-[#3A8EF6] focus:ring-2 focus:ring-[#3A8EF6]/40 rounded-xl transition-all duration-200 bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500"
                              placeholder="Enter your email address"
                            />
                          </Clerk.Input>
                          <Clerk.FieldError className="text-sm text-red-400 font-medium mt-2" />
                        </Clerk.Field>
                      </div>
                    </CardContent>

                    <CardFooter className="px-10 pb-10 pt-4">
                      <div className="w-full space-y-4">
                        <SignIn.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="w-full h-12 bg-gradient-to-r from-[#3A8EF6] via-[#6B46C1] to-[#3A8EF6] bg-[length:200%_auto] hover:bg-right text-white font-semibold text-base rounded-xl shadow-lg shadow-[#3A8EF6]/30 hover:shadow-xl hover:shadow-[#3A8EF6]/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Clerk.Loading>
                              {isLoading => {
                                return isLoading ? <Icons.spinner className="size-5 animate-spin" /> : 'Continue';
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>

                        <div className="text-center pt-2">
                          <Button variant="link" size="lg" asChild>
                            <Clerk.Link navigate="sign-up" className="text-slate-400 hover:text-white font-medium">
                              Don&apos;t have an account?{' '}
                              <span className="text-[#5CF4A0] font-semibold hover:brightness-110 ml-1">Sign up</span>
                            </Clerk.Link>
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              </SignIn.Step>

              {/* Choose Strategy Step */}
              <SignIn.Step name="choose-strategy">
                <Card className="w-full sm:w-[480px] border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl rounded-3xl relative overflow-hidden">
                  <div className="relative z-10">
                    <CardHeader className="text-center pt-12 pb-8 px-10">
                      <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1] rounded-2xl flex items-center justify-center shadow-lg shadow-[#6B46C1]/30">
                        <ArrowLeft className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-3">
                        Use another method
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-base font-medium">
                        Having trouble? Choose a different sign-in method.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-10 pb-4">
                      <div className="space-y-4">
                        <SignIn.SupportedStrategy name="email_code" asChild>
                          <Button
                            type="button"
                            variant="outline"
                            disabled={isGlobalLoading}
                            className="w-full h-12 border-white/20 bg-white/10 hover:border-[#3A8EF6]/50 hover:bg-white/20 transition-all duration-200 font-semibold text-slate-300 hover:text-white shadow-sm hover:shadow-md"
                          >
                            <Mail className="mr-3 size-5" />
                            Email code
                          </Button>
                        </SignIn.SupportedStrategy>

                        <SignIn.SupportedStrategy name="password" asChild>
                          <Button
                            type="button"
                            variant="outline"
                            disabled={isGlobalLoading}
                            className="w-full h-12 border-white/20 bg-white/10 hover:border-[#3A8EF6]/50 hover:bg-white/20 transition-all duration-200 font-semibold text-slate-300 hover:text-white shadow-sm hover:shadow-md"
                          >
                            <KeyRound className="mr-3 size-5" />
                            Password
                          </Button>
                        </SignIn.SupportedStrategy>
                      </div>
                    </CardContent>

                    <CardFooter className="px-10 pb-10">
                      <div className="w-full">
                        <SignIn.Action navigate="previous" asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="w-full h-12 bg-gradient-to-r from-[#3A8EF6] via-[#6B46C1] to-[#3A8EF6] bg-[length:200%_auto] hover:bg-right text-white font-semibold text-base rounded-xl shadow-lg shadow-[#3A8EF6]/30 hover:shadow-xl hover:shadow-[#3A8EF6]/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Clerk.Loading>
                              {isLoading => {
                                return isLoading ? <Icons.spinner className="size-5 animate-spin" /> : 'Go back';
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              </SignIn.Step>

              {/* Verifications Step */}
              <SignIn.Step name="verifications">
                {/* Password Strategy */}
                <SignIn.Strategy name="password">
                  <Card className="w-full sm:w-[480px] border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                      <CardHeader className="text-center pt-12 pb-8 px-10">
                        {/* <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1] rounded-2xl flex items-center justify-center shadow-lg shadow-[#6B46C1]/30">
                          <KeyRound className="h-8 w-8 text-white" />
                        </div> */}
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          width={150}
                          height={150}
                          className="object-contain mx-auto mb-0 mt-0 overflow-hidden"
                          priority
                        />

                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-3">
                          Enter your password
                        </CardTitle>
                        <p className="text-slate-400 text-base font-medium">
                          Welcome back{' '}
                          <span className="font-semibold text-white">
                            <SignIn.SafeIdentifier />
                          </span>
                        </p>
                      </CardHeader>

                      <CardContent className="px-10 pb-4">
                        <Clerk.Field name="password" className="space-y-3">
                          <Clerk.Label asChild>
                            <Label className="text-sm font-semibold text-slate-300 block mb-2">Password</Label>
                          </Clerk.Label>
                          <Clerk.Input type="password" asChild>
                            <Input
                              className="h-12 px-4 text-base border-2 border-white/20 focus:border-[#3A8EF6] focus:ring-2 focus:ring-[#3A8EF6]/40 rounded-xl transition-all duration-200 bg-white/5 backdrop-blur-sm text-white placeholder:text-slate-500"
                              placeholder="Enter your password"
                            />
                          </Clerk.Input>
                          <Clerk.FieldError className="text-sm text-red-400 font-medium mt-2" />
                        </Clerk.Field>
                      </CardContent>

                      <CardFooter className="px-10 pb-10">
                        <div className="w-full space-y-4">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="w-full h-12 bg-gradient-to-r from-[#3A8EF6] via-[#6B46C1] to-[#3A8EF6] bg-[length:200%_auto] hover:bg-right text-white font-semibold text-base rounded-xl shadow-lg shadow-[#3A8EF6]/30 hover:shadow-xl hover:shadow-[#3A8EF6]/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <Clerk.Loading>
                                {isLoading => {
                                  return isLoading ? <Icons.spinner className="size-5 animate-spin" /> : 'Continue';
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>

                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button
                              type="button"
                              size="sm"
                              variant="link"
                              className="w-full text-slate-400 hover:text-white font-medium"
                            >
                              Use another method
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                </SignIn.Strategy>

                {/* Email Code Strategy */}
                <SignIn.Strategy name="email_code">
                  <Card className="w-full sm:w-[480px] border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-xl rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                      <CardHeader className="text-center pt-12 pb-8 px-10">
                        <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-[#3A8EF6] to-[#6B46C1] rounded-2xl flex items-center justify-center shadow-lg shadow-[#6B46C1]/30">
                          <Mail className="h-8 w-8 text-white" />
                        </div>

                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-3">
                          Check your email
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-base font-medium mb-2">
                          Enter the verification code sent to your email
                        </CardDescription>
                        <p className="text-slate-400 text-sm font-medium">
                          Welcome back{' '}
                          <span className="font-semibold text-white">
                            <SignIn.SafeIdentifier />
                          </span>
                        </p>
                      </CardHeader>

                      <CardContent className="px-10 pb-4">
                        <Clerk.Field name="code">
                          <Clerk.Label className="sr-only">Email verification code</Clerk.Label>
                          <div className="space-y-6">
                            <div className="flex justify-center">
                              <Clerk.Input
                                type="otp"
                                autoSubmit
                                className="flex justify-center has-[:disabled]:opacity-50"
                                render={({ value, status }) => {
                                  return (
                                    <div
                                      data-status={status}
                                      className="relative flex h-14 w-12 items-center justify-center border-2 border-white/20 text-lg font-bold shadow-sm transition-all first:rounded-l-xl last:rounded-r-xl bg-white/10 backdrop-blur-sm mx-1 text-white data-[status=selected]:border-[#3A8EF6] data-[status=selected]:ring-2 data-[status=selected]:ring-[#3A8EF6]/40 data-[status=cursor]:border-[#3A8EF6] data-[status=cursor]:ring-2 data-[status=cursor]:ring-[#3A8EF6]/40"
                                    >
                                      {value}
                                    </div>
                                  );
                                }}
                              />
                            </div>

                            <div className="text-center space-y-4">
                              <Clerk.FieldError className="text-sm text-red-400 font-medium" />

                              <SignIn.Action
                                asChild
                                resend
                                className="text-slate-400"
                                fallback={({ resendableAfter }) => (
                                  <Button variant="link" size="sm" disabled className="text-slate-500">
                                    Didn&apos;t receive a code? Resend (
                                    <span className="tabular-nums font-semibold">{resendableAfter}</span>)
                                  </Button>
                                )}
                              >
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="text-[#5CF4A0] hover:text-[#5CF4A0] hover:brightness-110 font-semibold"
                                >
                                  Didn&apos;t receive a code? Resend
                                </Button>
                              </SignIn.Action>
                            </div>
                          </div>
                        </Clerk.Field>
                      </CardContent>

                      <CardFooter className="px-10 pb-10">
                        <div className="w-full space-y-4">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="w-full h-12 bg-gradient-to-r from-[#3A8EF6] via-[#6B46C1] to-[#3A8EF6] bg-[length:200%_auto] hover:bg-right text-white font-semibold text-base rounded-xl shadow-lg shadow-[#3A8EF6]/30 hover:shadow-xl hover:shadow-[#3A8EF6]/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <Clerk.Loading>
                                {isLoading => {
                                  return isLoading ? <Icons.spinner className="size-5 animate-spin" /> : 'Continue';
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>

                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button
                              size="sm"
                              variant="link"
                              className="w-full text-slate-400 hover:text-white font-medium"
                            >
                              Use another method
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
