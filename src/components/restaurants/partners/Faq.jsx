import React from "react";

const Faq = () => {
  
  const accordian = [
    { 
	"id": "1", 
	"question": "How does SmartDine help during peak seasons like Diwali or New Year? ",
	"answer": "SmartDine plays a crucial role during high-demand seasons such as Diwali, Christmas, and New Year’s Eve when restaurants often struggle with overcrowding and long wait times. By allowing customers to book tables in advance and even pre-order their meals, the app ensures that service is smoother and more organized. This not only reduces customer frustration but also helps restaurants manage their kitchen workload more efficiently. As a result, both customers and restaurants experience a stress-free dining environment even during the busiest periods of the year",
    },
    { 
	"id": "2", 
	"question": "What features does SmartDine provide for restaurants? ",
	"answer": "SmartDine provides a comprehensive set of tools tailored for restaurant management. Restaurants can manage table occupancy in real time, optimize seating arrangements, and update their menus instantly. The platform also enables order tracking, which helps the kitchen stay aligned with customer expectations. Additionally, owners receive insightful analytics on peak hours, customer preferences, and sales performance. These features combined empower restaurants to streamline their operations, enhance service quality, and ultimately boost customer satisfaction and repeat visits",
    },
    { 
	"id": "3", 
	"question": "How do customers benefit from using SmartDine? ",
	"answer": "Customers enjoy several benefits through SmartDine. Instead of waiting for long hours at crowded restaurants, they can reserve a table in advance, ensuring a guaranteed spot upon arrival. Pre-ordering food not only saves valuable time but also ensures faster service once they are seated. Additionally, SmartDine allows customers to explore menus ahead of time, discover promotions, and make payments digitally. This creates a modern, hassle-free dining experience where convenience and comfort are prioritized",
    },
    { 
	"id": "4", 
	"question": "Does SmartDine support online payments? ",
	"answer": "Yes, SmartDine fully supports online payments to make the dining experience more seamless. Customers can pay directly through the platform using various digital methods such as UPI, debit/credit cards, and wallets. This reduces the hassle of handling cash and speeds up the checkout process. For restaurants, digital payments mean better transparency, faster settlements, and easier financial tracking. Overall, online payments through SmartDine help create a modern and secure environment for both diners and businesses",
    },
    { 
	"id": "5", 
	"question": "Can restaurants customize their menus on SmartDine? ",
	"answer": "Absolutely! SmartDine offers restaurants full flexibility to customize their menus anytime. Owners can add new items, highlight seasonal specials, or temporarily disable dishes based on availability. They can also include attractive photos and detailed descriptions to entice customers. This level of customization ensures that restaurants can adapt quickly to changing customer demands while maintaining an engaging digital presence. As a result, SmartDine acts as both a functional tool and a marketing platform",
    },
    { 
	"id": "6", 
	"question": "How does SmartDine improve kitchen efficiency? ",
	"answer": "SmartDine significantly improves kitchen efficiency by giving chefs and staff advance visibility into incoming orders. With pre-orders and real-time order tracking, the kitchen can prepare dishes in the right sequence and manage resources better. This reduces last-minute rushes and minimizes errors in food preparation. Moreover, it allows restaurants to serve more customers within the same timeframe, which directly translates to increased sales and higher customer satisfaction.",
    },
	
 
];
  return (
    <div>
      <section className="faq py-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
           
           {accordian.map(List=>(

            <div className="accordion-item" key ={List.id} >
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${List.id}`}
                >
                  {List.question}
                </button>
              </h2>
              <div
                id={`faq${List.id}`}
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                 {List.answer}
                </div>
              </div>
            </div>
           ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
