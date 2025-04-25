
interface RoutePreviewProps {
  path: string,
}

export function RoutePreview({ path }: RoutePreviewProps) {
  const formattedPath = path ? `/api/${path}` : "/api/[route]"

  // Extract parameter names from the path
  // const pathParams = path.match(/\[(.*?)\]/g)?.map((param) => param.replace(/[[\]]/g, "")) || []

  return (
    <div className="space-y-4">
      <div className="space-y-2">

        <div className="rounded-md bg-muted p-2 font-mono text-sm">{formattedPath}</div>
      </div>

      

      {/* {(pathParams.length > 0 || queryParams.length > 0) && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Parameters</h4>

          {pathParams.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Path Parameters:</p>
              <ul className="text-xs space-y-1">
                {pathParams.map((param) => {
                  const matchedParam = matchedParams.find((p) => p.name === param)
                  return (
                    <li key={param} className="flex items-center gap-2">
                      <span className="font-mono">{param}</span>
                      {matchedParam && (
                        <>
                          <span className="text-muted-foreground">({matchedParam.type})</span>
                          {matchedParam.required && (
                            <Badge variant="outline" className="text-[10px] h-4">
                              required
                            </Badge>
                          )}
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {queryParams.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Query Parameters:</p>
              <ul className="text-xs space-y-1">
                {queryParams.map((param) => (
                  <li key={param.id} className="flex items-center gap-2">
                    <span className="font-mono">{param.name}</span>
                    <span className="text-muted-foreground">({param.type})</span>
                    {param.required && (
                      <Badge variant="outline" className="text-[10px] h-4">
                        required
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )} */}

      <div className="pt-2">
        <h4 className="text-sm font-medium mb-2">Example Request</h4>
        <div className="rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-100 overflow-x-auto">
          <pre>
            {`fetch("{BaseUrl}${formattedPath.replace(/\[(.*?)\]/g, "123")}",
          method: "$",
          headers: {
            "Content-Type": "application/json",
            "secret" : Your API Secret,
            "user_code" : Your User Code, 
          }, 
             ${`
    body: JSON.stringify({
    // request body
    })`
  }
)`}
          </pre>
        </div>
      </div>
    </div>
  )
}

