import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Code } from "lucide-react"

export default function Documentation() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dynamic API Router Documentation</h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive guide to using the Dynamic API Router platform
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              {/* What is api dynmaic router */}
              <CardHeader>
                <CardTitle>What is the Dynamic API Router?</CardTitle>
                <CardDescription>A robust platform for managing custom API routes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Dynamic API Router is a robust platform designed for managing custom API routes and orchestrating
                  microservices. It acts as a gateway that authenticates incoming requests, applies route-specific rate
                  limiting and caching, and forwards traffic to the user&#39;s own backend services. This system not only
                  simplifies API management but also provides a centralized solution to orchestrate all your
                  microservices under one unified hook.
                </p>
                  {/* key advantages and user onboarding */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Advantages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Simplified API Management: Easily add, modify, and monitor custom routes</li>
                        <li>
                          Microservices Integration: Consolidate and manage all your microservices through a single
                          entry point
                        </li>
                        <li>Enhanced Security: All requests must include valid client and user IDs</li>
                        <li>Customizable Traffic Controls: Define specific rate limiting and caching rules</li>
                        <li>
                          Centralized Analytics: Monitor route performance, service health, and identify bottlenecks
                        </li>
                        <li>In-Built User Management: Supports user signup, authentication, and route blocking</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">User Onboarding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">When a user visits the website, they can:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Sign Up:</strong> Create an account using their email and a secure password. Once
                          verified, they gain access to a user dashboard.
                        </li>
                        <li>
                          <strong>API Credentials:</strong> After sign up, each user is provided with a unique{" "}
                          <code className="bg-muted px-1 py-0.5 rounded">clientid</code> {" "}that must be included in every
                          request.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                {/* Microservice architecture */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Microservices Architecture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">The Dynamic API Router excels at microservices integration:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Single Entry Point:</strong> Consolidate multiple microservices behind one gateway,
                        reducing the number of public endpoints.
                      </li>
                      <li>
                        <strong>Consistent Layer:</strong> Apply uniform authentication, monitoring, and traffic
                        management across all services.
                      </li>
                      <li>
                        <strong>Simplified Architecture:</strong> Reduce complexity by centralizing routing logic and
                        service discovery.
                      </li>
                      <li>
                        <strong>Flexible Scaling:</strong> Scale individual microservices independently while
                        maintaining a consistent API interface.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Routes Tab */}
          <TabsContent value="routes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Route Management</CardTitle>
                <CardDescription>Define, customize, and manage your API routes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  {/* Defining routes */}
                  <AccordionItem value="defining-routes">
                  <AccordionTrigger>Defining Routes</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p>When you define a route, you need to provide two important values:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Requested Route:</strong> The endpoint path that the API Router will match against
                          incoming requests. It should include any dynamic segments wrapped in square brackets ([ ]) if
                          necessary.
                        </li>
                        <li>
                          <strong>Forwarded Route:</strong> The URL to your backend where the request will be forwarded.
                          It follows a similar template as the requested route so that any path or query parameters are
                          preserved in the forwarded URL.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Path query and parameters  */}
                  <AccordionItem value="parameters">
                    <AccordionTrigger>Path and Query Parameters</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <p>The system allows the use of both path parameters and query parameters for dynamic routing:</p>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Path Parameters</h4>
                          <p className="mb-2">
                            Defined by placing parameter names within square brackets (
                            <code className="bg-muted px-1 py-0.5 rounded">[ ]</code>). This captures any sub-path data.
                          </p>
                          <div className="bg-muted p-3 rounded-md">
                            <p className="font-medium">Example:</p>
                            <p>
                              For a route like{" "}
                              <code className="bg-background px-1 py-0.5 rounded">/dashboard/[path]</code>:
                            </p>
                            <p>
                              - Request URL:{" "}
                              <code className="bg-background px-1 py-0.5 rounded">
                                https://yourapigateway.com/dashboard/reports
                              </code>
                            </p>
                            <p>
                              - The parameter <code className="bg-background px-1 py-0.5 rounded">path</code> will
                              capture &#34;reports&#34;.
                            </p>
                          </div>
                        </div>

                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Query Parameters</h4>
                          <p className="mb-2">
                            Key-value pairs appended after a question mark (
                            <code className="bg-muted px-1 py-0.5 rounded">?</code>). These values are forwarded to the
                            backend without modification.
                          </p>
                          <div className="bg-muted p-3 rounded-md">
                            <p className="font-medium">Example:</p>
                            <p>
                              - Request URL:{" "}
                              <code className="bg-background px-1 py-0.5 rounded">
                                https://yourapigateway.com/dashboard/data?id=123&filter=active
                              </code>
                            </p>
                            <p>
                              - Query parameters <code className="bg-background px-1 py-0.5 rounded">id=123</code> and{" "}
                              <code className="bg-background px-1 py-0.5 rounded">filter=active</code> are included in
                              the forwarding.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Examples */}
                  <AccordionItem value="examples">
                    <AccordionTrigger>Route Examples : How to add routes in dashboard</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Example 1: Static Route Matching</h4>
                          <p className="mb-2">
                            <strong>Frontend Request:</strong> The url to which you are sending requests initially
                          </p>
                          <p className="bg-muted p-2 rounded mb-3">https://backend.in/klmo/param</p>

                          <p className="mb-2">
                            <strong>Route Configuration:</strong>
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <strong>Requested Route:</strong>{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">/klmo/param</code>
                            </li>
                            <li>
                              <strong>Forwarded Route:</strong>{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">https://backend.in/klmo/param</code>
                            </li>
                          </ul>
                          <p className="mt-2 text-sm text-muted-foreground">
                            In this example, the URL is static with no additional parameters. The API Router checks for
                            an exact match at /klmo/param and forwards the request directly to the specified backend
                            URL.
                          </p>
                        </div>

                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Example 2: Route with Query Parameters</h4>
                          <p className="mb-2">
                            <strong>Frontend Request:</strong>
                          </p>
                          <p className="bg-muted p-2 rounded mb-3">https://backend.in/dash?id=10</p>

                          <p className="mb-2">
                            <strong>Route Configuration:</strong>
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <strong>Requested Route:</strong>{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">/dash</code>
                            </li>
                            <li>
                              <strong>Forwarded Route:</strong>{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">https://backend.in/dash</code>
                            </li>
                          </ul>
                          <p className="mt-2 text-sm text-muted-foreground">
                            When query parameters are present (in this case, ?id=10), the API Router ignores them for
                            the purpose of route matching. It looks for a route that exactly matches /dash and forwards
                            the request to https://abcd.in/dash. The query parameters will still be included in the
                            forwarded request automatically.
                          </p>
                        </div>

                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Example 3: Route with Path Parameters</h4>
                          <p className="mb-2">
                            <strong>Frontend Request:</strong>
                          </p>
                          <p className="bg-muted p-2 rounded mb-3">https://backend.in/bash/paramveer</p>

                          <p className="mb-2">
                            <strong>Route Configuration:</strong>
                          </p>
                          <ul className="space-y-1">
                            <li>
                              <strong>Requested Route:</strong>{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">/bash/[path]</code>
                            </li>
                            <li>
                              <strong>Forwarded Route:</strong>{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">https://backend.in/bash/[path]</code>
                            </li>
                          </ul>
                          <p className="mt-2 text-sm text-muted-foreground">
                            For routes that contain dynamic segments, the variable part of the URL is denoted by [path].
                            In this example, the requested URL /bash/paramveer is matched by the route /bash/[path], and
                            the dynamic segment (paramveer) is injected into the forwarded route accordingly.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Structure and Forwarding</CardTitle>
                <CardDescription>How requests are processed and forwarded through the API Router</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Mandatory Fields : These should be set in headers while sending any requests</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">secret</code>: The unique identifier for the
                        client i.e. Your Api Key .
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">user_code</code>: The unique identifier for the user
                        making the request. For ratelimiting and analytics purposes.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">How It Works</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>The user&#39;s front-end sends a request to the API Gateway endpoint.</li>
                      <li>The API Gateway verifies the credentials (clientid and userid).</li>
                      <li>The system matches the requested path to the registered routes.</li>
                      <li>It applies any configured rate limiting, caching, and user blocking rules.</li>
                      <li>Upon successful validation, the request is forwarded to the configured backend URL.</li>
                    </ol>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Making API Requests with Axios</h3>
                  <div className="relative">
                    <div className="absolute top-3 right-3 bg-muted rounded-md p-1">
                      <Code size={16} />
                    </div>
                    <pre className="bg-muted p-4 rounded-md overflow-auto">
                      {`import axios from 'axios';

const secret = 'your-api-key';
const user_code = 'unique_user_code_given_by_you';
const baseUrl = 'https://yourapigateway.com';

const sendRequest = async (path, data) => {
  try {
    const response = await axios.post(\`\${baseUrl}/sendhere/\${path}\`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': clientID,
        'User-ID': userID,
      },
    });
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Request error:', error);
  }
};

// Example usage
sendRequest('dashboard/settings', { key: 'value' });`}
                    </pre>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium">Key Points:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>
                        Replace <code className="bg-muted px-1 py-0.5 rounded">baseurl</code> with the url that will be provided to you
                      </li>
                      <li>
                        Ensure headers include both <code className="bg-muted px-1 py-0.5 rounded">secret</code> and{" "}
                        <code className="bg-muted px-1 py-0.5 rounded">user_code</code> for proper authentication.
                      </li>
                      <li>Adjust Axios configuration to meet your specific project requirements.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rate Limiting</CardTitle>
                  <CardDescription>Protect your backend servers from excessive traffic</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    <strong>Purpose:</strong> Prevent abuse and protect backend servers by limiting the number of
                    requests per user within a specified timeframe.
                  </p>
                  <p>
                    <strong>Configuration Options:</strong> Users can define the maximum number of requests allowed per
                    time frame on a per-route basis.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Caching</CardTitle>
                  <CardDescription>Enhance performance with intelligent caching</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    <strong>Purpose:</strong> Enhance performance by temporarily storing frequently requested data.
                  </p>
                  <p>
                    <strong>Configuration Options:</strong> Users can define caching rules for each route to balance
                    between fresh data and load reduction.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blocking</CardTitle>
                  <CardDescription>Control access to your API routes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <strong>User Blocking:</strong> Each route can have rules to block specific users based on
                      clientid or other criteria, which is useful for preventing malicious traffic.
                    </li>
                    <li>
                      <strong>Route Blocking:</strong> Entire routes can be disabled without affecting overall
                      functionality.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Gain insights into your API usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <strong>Route Analytics:</strong> Provides detailed insights such as request frequency, average
                      response times, and error rates per route.
                    </li>
                    <li>
                      <strong>Service Health Monitoring:</strong> Track the performance and availability of individual
                      microservices.
                    </li>
                    <li>
                      <strong>User Request Analytics:</strong> Offers logs and visual reports for overall traffic and
                      performance at the user level.
                    </li>
                    <li>
                      <strong>Bottleneck Identification:</strong> Identify performance bottlenecks and plan for scaling
                      based on traffic patterns.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>Recommendations for optimal use of the Dynamic API Router</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="p-3 border rounded-md">
                    <strong className="block mb-1">Consistent Naming Conventions</strong>
                    <p className="text-sm text-muted-foreground">
                      Maintain consistency across route names, headers, and parameters to ease debugging and
                      maintenance.
                    </p>
                  </li>
                  <li className="p-3 border rounded-md">
                    <strong className="block mb-1">Error Handling</strong>
                    <p className="text-sm text-muted-foreground">
                      Implement robust error handling both in the API Gateway and the backend to gracefully manage
                      failures.
                    </p>
                  </li>
                  <li className="p-3 border rounded-md">
                    <strong className="block mb-1">Security Measures</strong>
                    <p className="text-sm text-muted-foreground">
                      Secure all endpoints using HTTPS and handle authentication tokens safely.
                    </p>
                  </li>
                  <li className="p-3 border rounded-md">
                    <strong className="block mb-1">Documentation Updates</strong>
                    <p className="text-sm text-muted-foreground">
                      Keep documentation up-to-date to reflect new features, improvements, or deprecations.
                    </p>
                  </li>
                  <li className="p-3 border rounded-md">
                    <strong className="block mb-1">Developer Support</strong>
                    <p className="text-sm text-muted-foreground">
                      Provide a developer FAQs section, sample code snippets, and clear contact/support information.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>FAQ and Troubleshooting</CardTitle>
                <CardDescription>Common questions and solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="blocked-requests">
                    <AccordionTrigger>What should I do if my requests are being blocked?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Verify that your <code className="bg-muted px-1 py-0.5 rounded">clientid</code> and{" "}
                        <code className="bg-muted px-1 py-0.5 rounded">userid</code> are correctly included. Review any
                        rate limiting or blocking rules for your route, and consult the analytics dashboard for error
                        patterns.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="update-route">
                    <AccordionTrigger>How do I update an existing route?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Update routes via your user dashboard. You can modify forwarding URLs, caching/rate limiting
                        configurations, or path parameter definitions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="analytics">
                    <AccordionTrigger>Where can I find detailed analytics of my routes?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Route and user request analytics are available on your dashboard with detailed logs, charts, and
                        performance metrics.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="disable-route">
                    <AccordionTrigger>Can I temporarily disable a route without deleting it?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes, you can disable a route through the dashboard, which will block incoming requests until the
                        route is re-enabled.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Alert>
              <AlertDescription>
                Need more help? Contact our support team at{" "}
                <a href="mailto:paramveer124501@gmail.com" className="font-medium underline">
                  paramveer124501@gmail.com
                </a>{" "}
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
