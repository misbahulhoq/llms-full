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
      <h2 className="text-sm font-medium   mb-3">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {steps.map((item) => (
          <Card
            key={item.step}
            className="border border-gray-100  bg-gray-50 dark:bg-gray-900/50"
          >
            <CardContent className="p-4">
              <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-foreground/30 dark:border-gray-700 flex items-center justify-center text-[11px] font-medium text-gray-600  mb-2">
                {item.step}
              </div>
              <h3 className="text-sm font-medium   mb-1">{item.title}</h3>
              <p className="text-xs   leading-relaxed">{item.desc}</p>
              {item.step === "2" && (
                <div className="flex gap-1.5 mt-3">
                  {LLMS.map((llm) => (
                    <span
                      key={llm.id}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-foreground/30 dark:border-gray-700  "
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
