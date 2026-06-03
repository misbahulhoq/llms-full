import { Card, CardContent } from "@/components/ui/card";
import { LLMS } from "@/lib/constants";

const steps = [
  {
    step: "1",
    title: "Find your library",
    desc: "Search by name or browse by category. Every major JS ecosystem library is indexed here.",
  },
  {
    step: "2",
    title: "Hit Ask",
    desc: "Choose your preferred LLM from the dropdown. You'll be redirected instantly with the docs pre-loaded as context.",
  },
  {
    step: "3",
    title: "Start asking",
    desc: "The LLM receives a prompt with your doc URL. No context window overflow — just relevant, structured answers.",
  },
];

const HowItWorks = () => {
  return (
    <div className="mb-8">
      <h2 className="mb-3 text-sm font-medium">How it works</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {steps.map((item) => (
          <Card
            key={item.step}
            className="border border-gray-100 bg-gray-50 dark:bg-gray-900/50"
          >
            <CardContent className="p-4">
              <div className="border-foreground/30 mb-2 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-[11px] font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800">
                {item.step}
              </div>
              <h3 className="mb-1 text-sm font-medium">{item.title}</h3>
              <p className="text-xs leading-relaxed">{item.desc}</p>
              {item.step === "2" && (
                <div className="mt-3 flex gap-1.5">
                  {LLMS.map((llm) => (
                    <span
                      key={llm.id}
                      className="border-foreground/30 rounded-full border px-2 py-0.5 text-[10px] dark:border-gray-700"
                    >
                      {llm.name}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
